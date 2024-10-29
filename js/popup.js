document.addEventListener('DOMContentLoaded', () => {
  const result = document.querySelector('#js_result');
  const inputs = document.querySelectorAll('.js_input');
  const copyBtn = document.querySelector('#js_copyBtn');

  let minFz = Number.parseInt(document.querySelector('.fz_min').value);
  let maxFz = Number.parseInt(document.querySelector('.fz_max').value);
  let minVp = Number.parseInt(document.querySelector('.vp_min').value);
  let maxVp = Number.parseInt(document.querySelector('.vp_max').value);
  let rootRem = Number.parseInt(document.querySelector('.rem').value);

  /* clampCalc function */
  const clampCalc = (fzMin, fzMax, vpMin, vpMax) => {
    const calc01 = (fzMax - fzMin) / (vpMax - vpMin);
    const calc02 = -vpMin * calc01 + fzMin;
    const remResult = calc02 / rootRem;
    const vpResult = calc01 * 100;

    // 小数点2桁で四捨五入
    const remResultRound = Math.round(remResult * 100) / 100;
    const vpResultRound = Math.round(vpResult * 100) / 100;

    return `${remResultRound}rem + ${vpResultRound}vw`;
  };

  let clampResult = clampCalc(minFz, maxFz, minVp, maxVp);

  /* initial value */
  result.value = `clamp(${minFz}px, ${clampResult}, ${maxFz}px)`;

  inputs.forEach(function (input) {
    input.addEventListener('input', () => {
      minFz = Number.parseInt(document.querySelector('.fz_min').value);
      maxFz = Number.parseInt(document.querySelector('.fz_max').value);
      minVp = Number.parseInt(document.querySelector('.vp_min').value);
      maxVp = Number.parseInt(document.querySelector('.vp_max').value);
      rootRem = Number.parseInt(document.querySelector('.rem').value);

      clampResult = clampCalc(minFz, maxFz, minVp, maxVp);

      result.value = '';
      result.value = `clamp(${minFz}px, ${clampResult}, ${maxFz}px)`;
    });
  });

  /* Copy button */
  copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(result.value).then(
      () => {
        setTimeout(() => {
          copyBtn.innerHTML =
            '<span class="txt"><svg version="1.1" id="_x32_" x="0px" y="0px" viewBox="0 0 512 512" style="width: 10px; height: 10px; opacity: 1;" xml:space="preserve"><style>.st0{fill:#fff;}</style><g><path class="st0" d="M469.402,35.492C334.09,110.664,197.114,324.5,197.114,324.5L73.509,184.176L0,254.336l178.732,222.172 l65.15-2.504C327.414,223.414,512,55.539,512,55.539L469.402,35.492z" style="fill: #fff;"></path></g></svg></span>';
        }, 0);
        setTimeout(() => {
          copyBtn.innerHTML = '<span class="txt">Copy!</span>';
        }, 1000);
      },
      () => {
        // alert('コピーに失敗しました。');
      }
    );
  });
});
