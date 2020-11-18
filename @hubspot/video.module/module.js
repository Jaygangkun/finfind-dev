const oembedContainers = document.getElementsByClassName('oembed_container');
const embedContainers = document.getElementsByClassName('embed_container');

function loadOEmbed(container) {
  const embedContainer = container;
  const iframeWrapper = embedContainer.querySelector('.iframe_wrapper');
  const customThumbnail = embedContainer.querySelector('.oembed_custom-thumbnail');
  const url = iframeWrapper.dataset.embedUrl;

  if (url) {
    
    var request = new XMLHttpRequest();
    var requestUrl = "/_hcms/oembed?url=" + url + "&autoplay=0";
    
    request.open('GET', requestUrl, true);
      request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
          var data = JSON.parse(request.responseText);
          
          const maxHeight = iframeWrapper.dataset.maxHeight !== undefined && !iframeWrapper.dataset.maxHeight ? data.height : iframeWrapper.dataset.maxHeight;
          const maxWidth = iframeWrapper.dataset.maxWidth !== undefined && !iframeWrapper.dataset.maxWidth ? data.width : iframeWrapper.dataset.maxWidth;
          const height = iframeWrapper.dataset.height !== undefined && !iframeWrapper.dataset.height ? data.height : iframeWrapper.dataset.height;
          const width = iframeWrapper.dataset.width !== undefined && !iframeWrapper.dataset.width ? data.width : iframeWrapper.dataset.width;

          const el = document.createElement('div');
          el.innerHTML = data.html;
          const iframe = el.firstChild;
          iframe.setAttribute("class", "oembed_container_iframe");
          iframe.setAttribute("title", data.title);

          if (customThumbnail) {
            customThumbnail.onclick = function(){
              iframe.src += "&autoplay=1";
              this.setAttribute("class", "oembed_custom-thumbnail--hide");
              iframeWrapper.appendChild(iframe);
            };
          } else {
            iframeWrapper.appendChild(iframe);
          }
          
          if (maxHeight) {
            const heightStr = maxHeight.toString(10) + "px";
            embedContainer.style.maxHeight = heightStr;
            iframe.style.maxHeight = heightStr;
            if (customThumbnail) {
              customThumbnail.style.maxHeight = heightStr;
            }
          }
          
          if (maxWidth) {
            const widthStr = maxWidth.toString(10) + "px";
            embedContainer.style.maxWidth = widthStr;
            iframe.style.maxWidth = widthStr;
            if (customThumbnail) {
              customThumbnail.style.maxWidth = widthStr;
            }
          }

          if (height) {
            const heightStr = height.toString(10) + "px";
            embedContainer.style.height = heightStr;
            iframe.style.height = heightStr;
            if (customThumbnail) {
              customThumbnail.style.height = heightStr;
            }
          }
          
          if (width) {
            const widthStr = width.toString(10) + "px";
            embedContainer.style.width = widthStr;
            iframe.style.width = widthStr;
            if (customThumbnail) {
              customThumbnail.style.width = widthStr;
            }
          }


        } else {
          console.error('Server reached, error retrieving results.');
        }
      };
      request.onerror = function() {
        console.error('Could not reach the server.');
      };
      request.send();
  
  }
}

function loadEmbed(container) {
  const embedContainer = container;
  const iframe = embedContainer.querySelector('.iframe_wrapper iframe');
  
  const maxHeight = iframe.getAttribute('height');
  const maxWidth = iframe.getAttribute('width');

  if (maxHeight !== null ) {
    const heightStr = maxHeight.toString(10) + "px";
    embedContainer.style.maxHeight = heightStr;
  } else {
    iframe.style.height = '100%';
  }
  
  if (maxWidth !== null) {
    const widthStr = maxWidth.toString(10) + "px";
    embedContainer.style.maxWidth = widthStr;
  } else {
    iframe.style.width = '100%';
  }
}

if (oembedContainers.length !== 0) {
  Array.prototype.forEach.call(oembedContainers, function(el) {
    loadOEmbed(el);
  });
}

if (embedContainers.length !== 0) {
  Array.prototype.forEach.call(embedContainers, function(el) {
    loadEmbed(el);
  });
}