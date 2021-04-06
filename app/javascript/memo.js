function memo() {
  // 送信ボタンのDOMを取得する
  const submit = document.getElementById("submit");
  submit.addEventListener('click',(e) => {
    const XHR = new XMLHttpRequest();
    const formData = new FormData(document.getElementById("form"));
    XHR.open("POST", "/posts", true);
    XHR.responseType = "json";
    XHR.send(formData);
    XHR.onload = () => {
      if (XHR.status != 200) {
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
        return null;
      }
      const item = XHR.response.post;
      const list = document.getElementById("list");
      const formText = document.getElementById("content");
      const HTML = `
        <div class="post" data-id=${item.id}>
          <div class="post-date">
            投稿日時：${item.created_at}
          </div>
          <div class="post-content">
            ${item.content}
          </div> 
        </div>`;
      list.insertAdjacentHTML("afterend", HTML);
      formText.value = "";
    }
    e.preventDefault();
  });
}

window.addEventListener('load',memo);