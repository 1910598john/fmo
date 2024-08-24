function mediaNotif(){
  document.body.insertAdjacentHTML("afterbegin", `
<div class="notif">
  Press 'Change server' button <br>if media is unavailable.
</div>`);

    setTimeout(() => {
      $(".notif").remove();
    }, 3000);
}

export default mediaNotif;
