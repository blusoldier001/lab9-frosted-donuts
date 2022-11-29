// 5b832d-2a041d-104386-3307d2-acff66

let endpoint = 'https://cse204.work';
let api_key = '5b832d-2a041d-104386-3307d2-acff66'; //debug

// Event listeners
$(document).ready(() => {
    // override default action on form enter submit
    $(window).keydown(function(event){
        if(event.keyCode == 13) {
          event.preventDefault();
          todoCreate_handler();
          return false;
        }
      });
    renderList()
});
$('#todo-creator-submit').click(todoCreate_handler);
$('.delete-button').click(todoCreate_handler);

// Login wall prompt for api key
$('#key-submit').click(() => {
    if ($('#key-input').val()) {
        api_key = $('#key-input').val();
        $('#keywall').css('display', 'none');
    } else {
        alert("Enter your secret api key!");
    }
});

// Renders list via jquery whenever called
function renderList() {
    console.log('rendering list...');
    // make request to api
    fetch(endpoint+'/todos', {
        method: 'GET',
        headers: {
            'x-api-key': api_key
        }
    })
    .then(res => res.json())
    .then(data => {
        // clear buffers
        $('#todo-list').html("");
        $('#todo-text').val("");

        // write buffer
        data.forEach((task) => {
            console.log(task['data']);
            let $obj = $().add(`<div class="task" value=${task['id']}>`);
            let $chk_box = $().add(`<input type="checkbox" value="${task['id']}">`);
            
            // update checkbox status
            if (task['completed']) {
                $chk_box.prop('checked', true);
                $obj.removeClass('incomplete');
                $obj.addClass('complete');
            } else {
                $chk_box.prop('checked', false);
                $obj.removeClass('complete');
                $obj.addClass('incomplete');
            }

            $chk_box.click(todoUpdate_handler);
            $obj.append($chk_box);
            $obj.append(`<p>${task['text']}</p>`);
            let $del_button = $().add(`<input type="button" class="delete-button" value="🗑️" id="${task['id']}">`);
            $del_button.click(todoDelete_handler);
            $obj.append($del_button);
            $('#todo-list').prepend($obj);
        });
    })
    .catch(err => console.error(err));
}

// Handles creation of a new todo item
function todoCreate_handler() {

    if ($('#todo-text').val()) {
        console.log('creating task...');

        let data = {
            text: $('#todo-text').val()
        };

        fetch(endpoint+'/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': api_key
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            renderList();
        })
        .catch(err => console.error(err));
    } else {
        alert("Task cannot be empty!");
    }
}

// Handles deletion of a todo item
function todoDelete_handler(e) {
    console.log('deleting task...');

    let del_id = e.target.id;

    fetch(endpoint+`/todos/${del_id}`, {
        method: 'DELETE',
        headers: {
            'x-api-key': api_key
        }
    })
    .then(res => {
        let status = res['status'];
        if (status == 200) {
            console.log("successfully deleted");
            renderList();
        } else {
            console.log("could not delete");
            alert("Could not delete task!");
        }
        console.log(status);
    })
    .catch(err => console.error(err));
}

// Handles updating of a todo item's status
function todoUpdate_handler(e) {
    let chk_id = e.target.value;
    let data = {};

    if (e.target.checked) {
        // update with completed status
        data['completed'] = true;
    } else {
        // update with incomplete status
        data['completed'] = false;
    }
    fetch(endpoint+`/todos/${chk_id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': api_key,
        },
        body: JSON.stringify(data)
    })
    .then(res => {
        console.log(res);
        renderList();
    })
    .catch(err => console.error(err));

}