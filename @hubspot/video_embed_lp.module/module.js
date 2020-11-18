function oembed(target, attributes) {
  var req = new XMLHttpRequest(),
    url = target.getAttribute('data-url'),
    provider = url
      .match(
        /(?:https?:\/\/)(?:.*\.)?(youtube|youtu|vimeo)(?:\.com|\.be)(?:\/.*)/
      )
      .pop(),
    providerStr =
      'on ' +
        provider.replace(/youtu(be)?/, 'YouTube').replace(/vimeo/, 'Vimeo') ||
      ' the host site',
    paramList = attributes.map(function(attribute) {
      var paramKey = '&' + attribute,
        paramValue = encodeURIComponent(
          target.getAttribute('data-' + attribute)
        );
      return [paramKey, paramValue].join('=');
    }),
    reqUrl =
      '/_hcms/oembed?url=' + encodeURIComponent(url) + paramList.join(''),
    errorDiv = document.createElement('div'),
    fallbackUrl = document.createElement('a');

  fallbackUrl.href = url;
  fallbackUrl.innerText = ' watch it ' + providerStr;
  errorDiv.classList.add('hs-oembed__error');
  errorDiv.innerHTML =
    '<span>There was a problem loading this video. <br>Please refresh the page or </span>';
  errorDiv.firstChild
    .insertAdjacentElement('beforeend', fallbackUrl)
    .insertAdjacentText('afterend', '.');

  req.open('GET', reqUrl, true);
  req.onerror = function() {
    target.appendChild(errorDiv);
  };
  req.onload = function() {
    if (this.status <= 400) {
      var data = JSON.parse(this.response);
      target.innerHTML += data.html;
      target.classList.toggle('loading');
    } else {
      target.appendChild(errorDiv);
    }
  };
  req.send();
}

document.addEventListener('DOMContentLoaded', function() {
  var oembedTargets = document.querySelectorAll('div[data-id="oembedder"]');
  Array.prototype.forEach.call(oembedTargets, function(thisElement) {
    oembed(thisElement, ['maxwidth', 'maxheight']);
  });
});
