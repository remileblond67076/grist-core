import {makeT} from 'app/client/lib/localization';
import {DataRowModel} from 'app/client/models/DataRowModel';
import {ViewFieldRec} from 'app/client/models/entities/ViewFieldRec';
import {cssLabel, cssRow} from 'app/client/ui/RightPanelStyles';
import {hideInPrintView, testId, theme} from 'app/client/ui2018/cssVars';
import {icon} from 'app/client/ui2018/icons';
import {IOptionFull, select} from 'app/client/ui2018/menus';
import {NTextBox} from 'app/client/widgets/NTextBox';
import {isFullReferencingType, isVersions} from 'app/common/gristTypes';
import {Computed, dom, styled} from 'grainjs';


const t = makeT('Reference');

/**
 * Reference - The widget for displaying references to another table's records.
 */
export class Reference extends NTextBox {
  private _visibleColRef: Computed<number>;
  private _validCols: Computed<Array<IOptionFull<number>>>;

  constructor(field: ViewFieldRec) {
    super(field);

    this._visibleColRef = Computed.create(this, (use) => use(this.field.visibleColRef));
    // Note that saveOnly is used here to prevent display value flickering on visible col change.
    this._visibleColRef.onWrite((val) => this.field.visibleColRef.saveOnly(val));

    this._validCols = Computed.create(this, (use) => {
      const refTable = use(use(this.field.column).refTable);
      if (!refTable) { return []; }
      return use(use(refTable.columns).getObservable())
        .filter(col => !use(col.isHiddenCol))
        .map<IOptionFull<number>>(col => ({
          label: use(col.label),
          value: col.getRowId(),
          icon: 'FieldColumn',
          disabled: isFullReferencingType(use(col.type)) || use(col.isTransforming)
        }))
        .concat([{label: t('Row ID'), value: 0, icon: 'FieldColumn'}]);
    });
  }

  public buildConfigDom() {
    return [
      this.buildTransformConfigDom(),
      cssLabel(t('CELL FORMAT')),
      super.buildConfigDom()
    ];
  }

  public buildTransformConfigDom() {
    const disabled = Computed.create(null, use => use(this.field.config.multiselect));
    return [
      cssLabel(t('SHOW COLUMN')),
      cssRow(
        dom.autoDispose(disabled),
        select(this._visibleColRef, this._validCols, {
          disabled
        }),
        testId('fbuilder-ref-col-select')
      )
    ];
  }

  public buildDom(row: DataRowModel) {
    // Note: we require 2 observables here because changes to the cell value (reference id)
    // and the display value (display column) are not bundled. This can cause `formattedValue`
    // to briefly display incorrect values (e.g. [Blank] when adding a reference to an empty cell)
    // because the cell value changes before the display column has a chance to update.
    //
    // TODO: Look into a better solution (perhaps updating the display formula to return [Blank]).
    const referenceId = Computed.create(null, (use) => {
      const id = row.cells[use(this.field.colId)];
      return id && use(id);
    });
    const formattedValue = Computed.create(null, (use) => {
      let [value, hasBlankReference] = ['', false];
      if (use(row._isAddRow) || this.isDisposed() || use(this.field.displayColModel).isDisposed()) {
        // Work around JS errors during certain changes (noticed when visibleCol field gets removed
        // for a column using per-field settings).
        return {value, hasBlankReference};
      }

      const displayValueObs = row.cells[use(use(this.field.displayColModel).colId)];
      if (!displayValueObs) {
        return {value, hasBlankReference};
      }

      const displayValue = use(displayValueObs);
      value = isVersions(displayValue) ?
        // We can arrive here if the reference value is unchanged (viewed as a foreign key)
        // but the content of its displayCol has changed.  Postponing doing anything about
        // this until we have three-way information for computed columns.  For now,
        // just showing one version of the cell.  TODO: elaborate.
        use(this.field.formatter).formatAny(displayValue[1].local || displayValue[1].parent) :
        use(this.field.formatter).formatAny(displayValue);

      hasBlankReference = referenceId.get() !== 0 && value.trim() === '';

      return {value, hasBlankReference};
    });

    return cssRef(
      dom.autoDispose(formattedValue),
      dom.autoDispose(referenceId),
      cssRef.cls('-blank', use => use(formattedValue).hasBlankReference),
      dom.style('text-align', this.alignment),
      dom.cls('text_wrapping', this.wrapping),
      cssRefIcon('FieldReference', testId('ref-link-icon'), hideInPrintView()),
      dom.text(use => {
        if (use(referenceId) === 0) { return ''; }
        if (use(formattedValue).hasBlankReference) { return '[Blank]'; }
        return use(formattedValue).value;
      })
    );
  }
}

const cssRefIcon = styled(icon, `
  float: left;
  --icon-color: ${theme.lightText};
  margin: -1px 2px 2px 0;
`);

const cssRef = styled('div.field_clip', `
  &-blank {
    color: ${theme.lightText}
  }
`);
