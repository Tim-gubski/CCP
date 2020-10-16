//alert("heheh")

let buttons = document.querySelectorAll(".btn")
let panel = document.querySelector(".tabPanel")

function setUpbar(){
  document.querySelectorAll(".tabsButton").forEach(button => {
    button.addEventListener("click", function(){
      const sideBar = button.parentElement;
      const tabsContainer = sideBar.parentElement;
      const tabNumber = button.dataset.forTab;
      const tabToActivate = tabsContainer.querySelector(`.tab__content[data-tab ="${tabNumber}"]`)

      sideBar.querySelectorAll(".tabsButton").forEach(button =>{
        button.classList.remove("tabsButton--active")
      });

      tabsContainer.querySelectorAll(".tab__content").forEach(tab =>{
        tab.classList.remove("tab__content--active")
      });

      button.classList.add("tabsButton--active");
      tabToActivate.classList.add("tab__content--active");

    })
  })
}

document.addEventListener("DOMContentLoaded", () =>{
  setUpbar();
})

"use strict";

let languagesJson = '/compile-languages.json'
let languagesSelect = '.language-select'
let judgeKey = 'fb0e781148msh89f403588aab478p199540jsn84ef056e595a'
let judgeHost = 'judge0.p.rapidapi.com'
  // https://rapidapi.com/hermanzdosilovic/api/judge0/endpoints - for new api key

/*
  Judge API wrapper class
*/
class Judge {

  constructor(options) {
    this.options = options
  }

  // GET reguest
  async getJson(point) {

    let ret = false

    await fetch('https://' + this.options.judgeHost + '/' + point, {
        'method': 'GET',
        'headers': {
          'x-rapidapi-host': this.options.judgeHost,
          'x-rapidapi-key': this.options.judgeKey,
        }
      })
      .then(response => response.json())
      .then(json => {
        ret = json
      })
      .catch(err => {
        console.log(err)
      });

    return ret
  }

  // POST request
  async postJson(point, body = false) {

    console.log(body)
    body['source_code'] = btoa(unescape(encodeURIComponent(body['source_code'])))
    let ret = false

    await fetch('https://' + this.options.judgeHost + '/' + point + '?base64_encoded=true', {
        'method': 'POST',
        'headers': {
          'x-rapidapi-host': this.options.judgeHost,
          'x-rapidapi-key': this.options.judgeKey,
          'content-type': 'application/json',
          'accept': 'application/json'
        },
        'body': JSON.stringify(body)
      })
      .then(response => response.json())
      .then(json => {
        ret = json
      })

    return ret
  }

  // Watch for compile result
  watchResult(token) {
    return new Promise((resolve, reject) => {

      this.options.compilerInterval = setInterval(() => {

        // Get result
        judge.getJson('submissions/' + token).then(res => {
          let message = '';

          if (res['message'] !== null) {
            message = res['message'] + ' - ';
          }

          $('#status').html(message + res['status']['description'])
          let status = parseInt(res['status']['id'])

          // Compile - FINISHED
          if (status > 2) {
            clearInterval(this.options.compilerInterval)
          }
          // Compile - OK
          if (status == 3) {
            resolve(res);
          }
          // Compile - ERROR
          if (status > 3) {
            reject(res)
          }

        })
      }, 1000 /* 1 second interval to check status of compilation */ );

    });

  }
}

/* 
  Editor class 
*/
class Editor {

  constructor(options) {
    this.options = options
    this.editor = ace.edit('editor')
    this.editor.setTheme('ace/theme/monokai')
    this.editor.session.setMode('ace/mode/javascript')
  }

  showResults(res) {
    $('#compile-errors').html(res['compile_output'])
    $('#result').html(res['stdout'])
    $('#errors').html(res['stderr'])
  }

  // Fetch languages from local, fill in select element
  fillSelect(jsonPath) {

    let select = $(this.options.languagesSelect)

    fetch(jsonPath, { "method": "GET" })
      .then(response => response.json())
      .then(languages => {
        languages.forEach((k, v) => {

          select
            .append(
              $('<option>', { lang: k.editor_mode, value: k.id, selected: k.selected })
              .text(k.name)
            )
        });
      }).then(() => {
        this.syncEditorMode()
      })

    // Select language
    $(this.options.languagesSelect).change((e) => {
      this.syncEditorMode()
    })


  }

  // Sync current language mode with select
  syncEditorMode() {
    let lang = $('option:selected', $(this.options.languagesSelect)).attr('lang');

    fetch('compile-samples/' + lang, { "method": "GET" })
      .then(response => {
        if (response.ok) {
          return response.text()
        } else {
          return false;
        }
      })
      .then(sample => {
        if (sample) {
          this.editor.setValue(sample)
        }
      })

    this.editor.session.setMode('ace/mode/' + lang)
  }

  getCurrentLanguageId() {
    console.log(
      $(this.options.languagesSelect).val(),
      $(this.options.languagesSelect).text()
    );
    return $(this.options.languagesSelect).val()
  }

  getSourceCode() {
    return this.editor.getValue()
  }
}


jQuery(function($) {

  let judge = new Judge({
    'judgeKey': judgeKey,
    'judgeHost': judgeHost,
  })

  let editor = new Editor({
    'languagesSelect': languagesSelect,
  })

  window.judge = judge
  window.editor = editor

  // Fill in language selector
  editor.fillSelect(languagesJson)


  // Click on compile button
  $('.compile').click(() => {

    $('.output').html('')
    $('#status').html('Sending source')

    // Post source code
    judge.postJson('submissions', {
      'language_id': editor.getCurrentLanguageId(),
      'source_code': editor.getSourceCode(),
    }).then(sub => {

      judge.watchResult(sub['token']).then(

        // On compile
        (res) => {
          console.log('OK', res)
          editor.showResults(res)
        },

        // On errors
        (res) => {
          console.log('ERROR', res)
          editor.showResults(res)
        })
    })

  });

})


