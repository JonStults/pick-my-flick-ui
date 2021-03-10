export class Messenger {
  codeletters: string;
  message: number;
  current_length: number;
  fadeBuffer: any;
  messages: string[];
  id: string;
  constructor(id: string, messages: string[]) {
    this.codeletters = "&#*+%?£@§$";
    this.message = 0;
    this.current_length = 0;
    this.fadeBuffer = false;
    this.messages = messages;
    this.id = id;
    setTimeout(this.animateIn, 300);
  }


  generateRandomString = (length: number) => {
    var random_text = '';
    while (random_text.length < length) {
      random_text += this.codeletters.charAt(Math.floor(Math.random() * this.codeletters.length));
    }

    return random_text;
  };

  animateIn = () => {
    if (this.current_length < this.messages[this.message].length) {
      this.current_length = this.current_length + 2;
      if (this.current_length > this.messages[this.message].length) {
        this.current_length = this.messages[this.message].length;
      }

      var message = this.generateRandomString(this.current_length);
      let el: any = document.getElementById(this.id);
      el.innerHTML = message;
      setTimeout(this.animateIn, 20);
    } else {
      setTimeout(this.animateFadeBuffer, 20);
    }
  };

  animateFadeBuffer = () => {
    if (this.fadeBuffer === false) {
      this.fadeBuffer = [];
      for (var i = 0; i < this.messages[this.message].length; i++) {
        // change this multiplier to make scramble longer
        this.fadeBuffer.push({ c: (Math.floor(Math.random() * 12)) + 1, l: this.messages[this.message].charAt(i) });
      }
    }

    var do_cycles = false;
    var message = '';

    for (var i = 0; i < this.fadeBuffer.length; i++) {
      var fader = this.fadeBuffer[i];
      if (fader.c > 0) {
        do_cycles = true;
        fader.c--;
        message += this.codeletters.charAt(Math.floor(Math.random() * this.codeletters.length));
      } else {
        message += fader.l;
      }
    }

    let el: any = document.getElementById(this.id);
    el.innerHTML = message;

    if (do_cycles === true) {
      setTimeout(this.animateFadeBuffer, 50);
    } else {
      // setTimeout(this.cycleText, 2000);
    }
  };

  cycleText = () => {
    this.message = this.message + 1;
    if (this.message >= this.messages.length) {
      this.message = 0;
    }

    this.current_length = 0;
    this.fadeBuffer = false;
    let el: any = document.getElementById(this.id);
    el.innerHTML = '';

    setTimeout(this.animateIn, 200);
  };
}
