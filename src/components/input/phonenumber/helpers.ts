import { BY_NUMBER_CODE_PLUS } from '@constants/auth.constants';

const SYMBOLS_SPACE = ' ';
const SYMBOLS_PLUS = '+';

export const formatMaskInput = (oldText: string, newText: string, mask: string, pattern: RegExp) => {
  const isMatchPattern = !!newText && !pattern?.test(newText);

  if (newText.length < BY_NUMBER_CODE_PLUS.length || isMatchPattern || newText.substr(1).includes(SYMBOLS_PLUS)) {
    return oldText;
  }

  if (newText.substr(0, 3).includes(BY_NUMBER_CODE_PLUS)) {
    newText = `+${newText}`;
  }

  let i = 0;
  let j = 0;
  const newTextSpaceless = newText.replace(/ /g, '').split('');
  const resultText: string[] = [];

  mask.split('').forEach((symbol) => {
    if (symbol === SYMBOLS_SPACE && i <= newTextSpaceless.length) {
      resultText.push(SYMBOLS_SPACE);

      return;
    }

    if (newTextSpaceless[j]) {
      resultText.push(newTextSpaceless[j]);
      j += 1;
    }

    i += 1;
  });

  return resultText.join('').trim();
};
