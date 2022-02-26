const taskList = [];
const badList = [];
let taskListElm = document.getElementById("task-list");
let badListElm = document.getElementById("bad-list");

const handleOnSubmit = (e) => {
  const frmDt = new FormData(e);

  const task = frmDt.get("task");
  const hr = +frmDt.get("hr");
  const obj = {
    task,
    hr,
  };

  taskList.push(obj);
  display();
};

// display task listl

const display = () => {
  let str = "";

  // loop through the task list and convert it into string

  taskList.map((items, i) => {
    str += ` <tr>
        <td>
          <input type="checkbox" />
        </td>
        <td>${items.task}</td>
        <td>${items.hr}</td>
        <td>
          <button class="btn btn-danger" onclick="deleteTaskList(${i})">
            <i class="fa-solid fa-trash-can"></i>
          </button>
          <button class="btn btn-success" onclick="markAsNotToDo(${i})">
            <i class="fas fa-arrow-right"></i>
          </button>
        </td>
      </tr>`;
  });

  taskListElm.innerHTML = str;
};

const displayBadList = () => {
  let str = "";

  badList.map((item, i) => {
    str += `
    <tr>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>${item.task}</td>
                    <td>${item.hr}</td>
                    <td>
                      <button class="btn btn-info" onclick="markAsTask(${i})">
                        <i class="fas fa-arrow-left"></i>
                      </button>
                      <button class="btn btn-danger" onclick="deleteBadList(${i})">
                        <i class="fa-solid fa-trash-can"></i>
                      </button>
                    </td>
                  </tr>    
    `;
  });

  badListElm.innerHTML = str;
};

// deleting the item

const deleteTaskList = (i) => {
  const itm = taskList.splice(i, 1);
  display();

  return itm[0];
};

const deleteBadList = (i) => {
  const itm = badList.splice(i, 1);
  displayBadList();
  return itm[0];
};

// delete item as to not to do

const markAsNotToDo = (i) => {
  const badItm = deleteTaskList(i);
  badList.push(badItm);

  displayBadList();
};

const markAsTask = (i) => {
  const badItm = deleteBadList(i);
  taskList.push(badItm);
  display();
};
