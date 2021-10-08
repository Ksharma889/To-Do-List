/**
 * =======================================================
 * =   Cheack To-Do Pending Task List is empty or not    =
 * =======================================================
 */

 let cheack_todo_pending_list_is_empty_or_not = () => {
    const pending_task_todo = document.querySelectorAll('.pending-task .pending-todo');
    const empty_todo_pending_list = document.querySelector('.todo-hide-text');
    if (pending_task_todo.length <= 0) {
        empty_todo_pending_list.classList.add('active');
    } else {
        empty_todo_pending_list.classList.remove('active');
    }
}

/**
 * ===============================================================
 * =   Cheack To-Do Last 5 Completed Task List is empty or not   =
 * ===============================================================
 */

let cheack_todo_complete_list_is_empty_or_not = () => {
    const complete_task_todo = document.querySelector('.right-side .completed-list');
    const empty_todo_complete_list = document.querySelector('.complete-todo-empty');
    if (complete_task_todo.children.length <= 0) {
        empty_todo_complete_list.classList.add('active');
    } else {
        empty_todo_complete_list.classList.remove('active');
    }
}

/**
 * ================================================
 * =   Cheack To-Do Total Task List <= 7 or not   =
 * ================================================
 */
let cheack_total_todo_task = ()=>{
    const total_todo_task = document.querySelectorAll('.pending-task .pending-todo').length;
    const todo_error = document.querySelector('.todo-error');
    if(total_todo_task > 6){
        todo_error.classList.add('active');
        setTimeout(()=>{
            todo_error.classList.remove('active');
        },3500);
    }
}

/**
 * ==========================================================
 * =   Cheack To-Do Total Completed Task List <= 5 or not   =
 * ==========================================================
 */
let total_completed_task = ()=>{
    const completed_task = document.querySelectorAll('.right-side .completed-list li');
    if(completed_task.length > 5){
        completed_task[5].remove()
    }
}

/**
 * =========================================================
 * =   Create Function to add todo task on pendding task   =
 * =========================================================
 */
 let click_plus_or_enter_on_input_box = ()=>{
    let get_input_value = document.querySelector('#add-todo').value;
    const edit_todo_area = document.querySelector('.pending-task .todo-list-area');
    const total_todo_task = document.querySelectorAll('.pending-task .pending-todo').length;
    cheack_total_todo_task();
    if (get_input_value != "" && total_todo_task < 7) {
        const add_todo_html = `<div class="pending-todo"><p><span data-text='${get_input_value}'>${get_input_value.slice(0, 41)}</span><span>...</span></p> <div class="right-btn"><div class="status d-flex-center normal"><span>normal</span></div><div class="add-btn d-flex-center"><img src="assets/Images/pencil.png" alt=""></div></div></div>`;
        edit_todo_area.insertAdjacentHTML("beforeend", add_todo_html);
        
        // Call - To-Do List Fetch Data to Updating a To-Do List Function
        fetch_data_update_todo_list();

        // Call - Cheack To-Do Pending Task List is empty or not Function
        cheack_todo_pending_list_is_empty_or_not();
    }
    document.querySelector('#add-todo').value = "";
}

/**
 * =============================================
 * =   To-Do List Update Popup Form Function   =
 * =============================================
 */
let todo_list_update_popup_form_function = () => {
    const todo_popup_form = document.querySelector('.to-do-edit');
    todo_popup_form.addEventListener("click", (e) => {
        if (e.target.classList.contains("to-do-edit")) {
            todo_popup_form.classList.remove("active");
            //remove class from active todo
            const active_todo = document.querySelector('.pending-task .pending-todo.active');
            active_todo.classList.remove("active");
        }
    });
}

/**
 * ======================================================
 * =   To-Do List Fetch Data to Updating a To-Do List   =
 * ======================================================
*/
let fetch_data_update_todo_list = () => {
    const todo_popup_btn = document.querySelectorAll('.pending-task .add-btn');
    const todo_popup_form = document.querySelector('.to-do-edit');
    todo_popup_btn.forEach(editBtn => {
        editBtn.addEventListener('click', () => {
            //target active todo
            const active_todo = editBtn.parentNode.parentNode;
            active_todo.classList.add('active');
            todo_popup_form.classList.add("active");

            // todo list tittle
            const title_update = document.querySelector('.to-do-edit .add-to-do input');
            const todo_title = editBtn.parentNode.parentNode.children[0].children[0].getAttribute('data-text');
            title_update.value = todo_title;

            // status check and implement
            const status_class = editBtn.parentNode.children[0].classList[2];
            const current_todo_status = document.querySelector('.current-to-do-status .dot').classList;
            const add_cheack_status = document.querySelector(`.to-do-edit .status-type input[type=radio].${status_class}`);
            current_todo_status.remove(`${current_todo_status[1]}`);
            current_todo_status.add(`${status_class}`);
            add_cheack_status.checked = true;
        });
    });
}

/**
 * ==========================================================
 * =  Implement Update Function When Click On (right) Btn   =
 * ==========================================================
*/
let update_todo_list_function = () => {
    const update_todo_btn = document.querySelector('.to-do-edit .update-btn');
    update_todo_btn.addEventListener('click', () => {
        // get & set title update
        const new_todo_title = document.querySelector('#update-todo-title').value;
        const set_todo_title = document.querySelector('.pending-todo.active p span');
        set_todo_title.innerText = new_todo_title.slice(0, 41);
        set_todo_title.setAttribute('data-text', new_todo_title);

        //get & set todo status
        const new_todo_status = document.querySelector('input[name="to_do_status"]:checked').value;
        const update_todo_status = document.querySelector('.pending-todo.active .status');
        const current_todo_status = update_todo_status.classList[2];
        update_todo_status.classList.remove(current_todo_status);
        update_todo_status.classList.add(new_todo_status);
        update_todo_status.children[0].innerText = new_todo_status;

        //close todo popup form & remove active class
        const todo_popup_form = document.querySelector('.to-do-edit');
        todo_popup_form.classList.remove('active');
        set_todo_title.parentNode.parentNode.classList.remove('active');
    });
}

/**
 * ==================================================
 * =  Delete Active To-Do List From Pendding Task   =
 * ===================================================
*/
let delete_active_todo_list = () => {
    const todo_popup_form = document.querySelector('.to-do-edit');
    const delete_todo_btn = document.querySelector('.to-do-edit .delete-btn');
    delete_todo_btn.addEventListener('click', () => {
        const delete_todo = document.querySelector('.pending-task .pending-todo.active');
        const confirm_delete_todo = confirm('Are you sure do you want to delete this todo?');
        if (confirm_delete_todo) {
            delete_todo.remove();
            //close todo popup form & remove active class
            todo_popup_form.classList.remove('active');

            cheack_todo_pending_list_is_empty();
        }
    });
}

/**
 * =========================================================
 * =  Complete Active To-Do Task & Add on Completed List   =
 * =========================================================
*/
let complete_active_todo_task = () => {
    const todo_popup_form = document.querySelector('.to-do-edit');
    // complete todo 
    const complete_todo_btn = document.querySelector('.to-do-edit .complete-task-btn');
    complete_todo_btn.addEventListener('click', () => {
        const complete_todo = document.querySelector('.pending-task .pending-todo.active');
        const confirm_complete_todo = confirm('Are you sure do you really completed this task?');
        const complete_todo_task_list = document.querySelector('.right-side ul.completed-list');
        const todo_title = complete_todo.children[0].children[0].innerText;
        const append_html_node = `<li><div class="right d-flex-center"><img src="assets/Images/check-2.png" alt=""></div><p>${todo_title.slice(0, 21)}...</p></li>`;
        if (confirm_complete_todo) {
            complete_todo.remove();
            complete_todo_task_list.insertAdjacentHTML("afterbegin", append_html_node);
            todo_popup_form.classList.remove('active');
            cheack_todo_complete_list_is_empty_or_not();
            cheack_todo_pending_list_is_empty_or_not();
            total_completed_task();
        }
    });
}

/**
 * =========================================================
 * =   Create To-do Add On Pending Task & Call Functions   =
 * =========================================================
*/
const todo_add_btn = document.querySelector('.to-do-container .left-side .add-btn');
const get_input_enter_btn_value = document.querySelector('#add-todo');

todo_add_btn.addEventListener('click', () => {
    click_plus_or_enter_on_input_box();
});

get_input_enter_btn_value.addEventListener('keyup', (e)=>{
    if(e.keyCode === 13){
        click_plus_or_enter_on_input_box();
    }
})

/**
 * ==================================
 * =   Window Load Event Listener   =
 * ==================================
 */
window.addEventListener('load', () => {
    cheack_todo_pending_list_is_empty_or_not();
    cheack_todo_complete_list_is_empty_or_not();

    // Call - Implement Update Function When Click On (right) Btn Function
    update_todo_list_function();
    // Call - Delete Active To-Do List From Pendding Task Function
    delete_active_todo_list();
    // Call - Complete Active To-Do Task & Add on Completed List Function
    complete_active_todo_task();
    // Call - To-Do List Update Popup Form Function
    todo_list_update_popup_form_function();
});