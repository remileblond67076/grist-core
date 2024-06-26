import {colors, mediaXSmall, vars} from 'app/client/ui2018/cssVars';
import {icon} from 'app/client/ui2018/icons';
import {numericSpinner} from 'app/client/widgets/NumericSpinner';
import {styled} from 'grainjs';

export const label = styled('div', `
  &-required::after {
    content: "*";
    color: ${vars.primaryBg};
    margin-left: 4px;
  }
`);

export const paragraph = styled('div', `
  overflow-wrap: break-word;

  &-alignment-left {
    text-align: left;
  }
  &-alignment-center {
    text-align: center;
  }
  &-alignment-right {
    text-align: right;
  }
`);

export const section = styled('div', `
  border-radius: 3px;
  border: 1px solid ${colors.darkGrey};
  padding: 24px;
  margin-top: 12px;
  margin-bottom: 24px;

  & > div + div {
    margin-top: 8px;
    margin-bottom: 12px;
  }
`);

export const columns = styled('div', `
  display: grid;
  grid-template-columns: repeat(var(--grist-columns-count), 1fr);
  gap: 16px;
`);

export const submitButtons = styled('div', `
  margin-top: 16px;
  display: flex;
  justify-content: center;
  column-gap: 8px;
`);

export const resetButton = styled('button', `
  line-height: inherit;
  font-size: ${vars.mediumFontSize};
  padding: 10px 24px;
  cursor: pointer;
  background-color: transparent;
  color: ${vars.primaryBg};
  border: 1px solid ${vars.primaryBg};
  border-radius: 4px;
  outline-color: ${vars.primaryBgHover};

  &:hover {
    color: ${vars.primaryBgHover};
    border-color: ${vars.primaryBgHover};
  }
  &:disabled {
    cursor: not-allowed;
    color: ${colors.light};
    background-color: ${colors.slate};
    border-color: ${colors.slate};
  }
`);

export const submitButton = styled('div', `
  display: flex;
  justify-content: center;
  align-items: center;

  & input[type="submit"] {
    background-color: ${vars.primaryBg};
    border: 1px solid ${vars.primaryBg};
    color: white;
    padding: 10px 24px;
    border-radius: 4px;
    font-size: 13px;
    cursor: pointer;
    line-height: inherit;
    outline-color: ${vars.primaryBgHover};
  }
  & input[type="submit"]:hover {
    border-color: ${vars.primaryBgHover};
    background-color: ${vars.primaryBgHover};
  }
  & input[type="submit"]:disabled {
    cursor: not-allowed;
    color: ${colors.light};
    background-color: ${colors.slate};
    border-color: ${colors.slate};
  }
`);

// TODO: break up into multiple variables, one for each field type.
export const field = styled('div', `
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;

  & input[type="checkbox"] {
    -webkit-appearance: none;
    -moz-appearance: none;
    margin: 0;
    padding: 0;
    flex-shrink: 0;
    display: inline-block;
    width: 16px;
    height: 16px;
    --radius: 3px;
    position: relative;
    margin-right: 8px;
    vertical-align: baseline;
  }
  & input[type="checkbox"]:focus {
    outline-color: ${vars.primaryBgHover};
  }
  & input[type="checkbox"]:checked:enabled,
  & input[type="checkbox"]:indeterminate:enabled {
    --color: ${vars.primaryBg};
  }
  & input[type="checkbox"]:disabled {
    --color: ${colors.darkGrey};
    cursor: not-allowed;
  }
  & input[type="checkbox"]::before,
  & input[type="checkbox"]::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 16px;
    width: 16px;
    box-sizing: border-box;
    border: 1px solid var(--color, ${colors.darkGrey});
    border-radius: var(--radius);
  }
  & input[type="checkbox"]:checked::before,
  & input[type="checkbox"]:disabled::before,
  & input[type="checkbox"]:indeterminate::before {
    background-color: var(--color);
  }
  & input[type="checkbox"]:not(:checked):indeterminate::after {
    -webkit-mask-image: var(--icon-Minus);
  }
  & input[type="checkbox"]:not(:disabled)::after {
    background-color: ${colors.light};
  }
  & input[type="checkbox"]:checked::after,
  & input[type="checkbox"]:indeterminate::after {
    content: '';
    position: absolute;
    height: 16px;
    width: 16px;
    -webkit-mask-image: var(--icon-Tick);
    -webkit-mask-size: contain;
    -webkit-mask-position: center;
    -webkit-mask-repeat: no-repeat;
    background-color: ${colors.light};
  }
  & > .${label.className} {
    color: ${colors.dark};
    font-size: 13px;
    font-style: normal;
    font-weight: 700;
    line-height: 16px; /* 145.455% */
    margin-top: 8px;
    margin-bottom: 8px;
    display: block;
    overflow-wrap: break-word;
  }
`);

export const error = styled('div', `
  margin-top: 16px;
  text-align: center;
  color: ${colors.error};
  min-height: 22px;
`);

export const textInput = styled('input', `
  color: ${colors.dark};
  background-color: ${colors.light};
  height: 29px;
  width: 100%;
  font-size: 13px;
  line-height: inherit;
  padding: 4px 8px;
  border: 1px solid ${colors.darkGrey};
  border-radius: 3px;
  outline-color: ${vars.primaryBgHover};
`);

export const textarea = styled('textarea', `
  display: block;
  color: ${colors.dark};
  background-color: ${colors.light};
  min-height: 29px;
  width: 100%;
  font-size: 13px;
  line-height: inherit;
  padding: 4px 8px;
  border: 1px solid ${colors.darkGrey};
  border-radius: 3px;
  outline-color: ${vars.primaryBgHover};
  resize: none;
`);

export const spinner = styled(numericSpinner, `
  & input {
    height: 29px;
    border: none;
    font-size: 13px;
    line-height: inherit;
  }

  &:focus-within {
    outline: 2px solid ${vars.primaryBgHover};
  }
`);

export const toggle = styled('label', `
  position: relative;
  display: inline-flex;
  margin-top: 8px;

  &:hover {
    --color: ${colors.hover};
  }
`);

export const toggleSwitch = styled(toggle, `
  cursor: pointer;

  & input[type='checkbox'] {
    margin: 0;
    position: absolute;
    top: 1px;
    left: 4px;
  }
  & input[type='checkbox'],
  & input[type='checkbox']::before,
  & input[type='checkbox']::after {
    height: 1px;
    width: 1px;
  }
  & input[type='checkbox']:focus {
    outline: none;
  }
  & input[type='checkbox']:focus {
    outline: none;
  }
  & > span {
    margin-left: 8px;
  }
`);

export const toggleLabel = styled('span', `
  font-size: 13px;
  font-weight: 700;
  line-height: 16px;
  overflow-wrap: anywhere;
`);

export const gristSwitchSlider = styled('div', `
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  border-radius: 17px;
  -webkit-transition: background-color .4s;
  transition: background-color .4s;
`);

export const gristSwitchCircle = styled('div', `
  position: absolute;
  cursor: pointer;
  content: "";
  height: 13px;
  width: 13px;
  left: 2px;
  bottom: 2px;
  background-color: white;
  border-radius: 17px;
  -webkit-transition: transform .4s;
  transition: transform .4s;
`);

export const gristSwitch = styled('div', `
  position: relative;
  width: 30px;
  height: 17px;
  display: inline-block;
  flex: none;

  input:focus + & > .${gristSwitchSlider.className} {
    outline: 2px solid ${vars.primaryBgHover};
    outline-offset: 1px;
  }

  input:checked + & > .${gristSwitchSlider.className} {
    background-color: ${vars.primaryBg};
  }

  input:checked + & > .${gristSwitchCircle.className} {
    -webkit-transform: translateX(13px);
    -ms-transform: translateX(13px);
    transform: translateX(13px);
  }
`);

export const checkboxList = styled('div', `
  display: inline-flex;
  flex-direction: column;
  gap: 8px;

  &-horizontal {
    flex-direction: row;
    flex-wrap: wrap;
    column-gap: 16px;
  }
`);

export const checkbox = styled('label', `
  display: flex;
  font-size: 13px;
  line-height: 16px;
  gap: 8px;
  overflow-wrap: anywhere;

  & input {
    margin: 0px !important;
  }
  &:hover {
    --color: ${colors.hover};
  }
`);

export const radioList = checkboxList;

export const radio = styled('label', `
  position: relative;
  display: inline-flex;
  gap: 8px;
  font-size: 13px;
  line-height: 16px;
  font-weight: normal;
  min-width: 0px;
  outline-color: ${vars.primaryBgHover};
  overflow-wrap: anywhere;

  & input {
    flex-shrink: 0;
    appearance: none;
    width: 16px;
    height: 16px;
    margin: 0px;
    border-radius: 50%;
    background-clip: content-box;
    border: 1px solid ${colors.darkGrey};
    background-color: transparent;
    outline-color: ${vars.primaryBgHover};
  }
  & input:hover {
    border: 1px solid ${colors.hover};
  }
  & input:checked {
    padding: 2px;
    background-color: ${vars.primaryBg};
    border: 1px solid ${vars.primaryBg};
  }
`);

export const hybridSelect = styled('div', `
  position: relative;
`);

export const select = styled('select', `
  position: absolute;
  padding: 4px 8px;
  border-radius: 3px;
  border: 1px solid ${colors.darkGrey};
  font-size: 13px;
  outline: none;
  background: white;
  line-height: inherit;
  height: 29px;
  flex: auto;
  width: 100%;

  @media ${mediaXSmall} {
    & {
      outline: revert;
      outline-color: ${vars.primaryBgHover};
      position: relative;
    }
  }
`);

export const searchSelect = styled('div', `
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  padding: 4px 8px;
  border-radius: 3px;
  outline: 1px solid ${colors.darkGrey};
  font-size: 13px;
  background: white;
  line-height: inherit;
  height: 29px;
  flex: auto;
  width: 100%;

  select:focus + & {
    outline: 2px solid ${vars.primaryBgHover};
  }
`);

export const searchSelectIcon = styled(icon, `
  flex-shrink: 0;
`);
