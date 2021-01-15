import React from 'react';
import {Modal,Button} from 'react-bootstrap'
import './Todo.css';
import DisplayTask from './DisplayTask';
class Todo extends React.Component{

    state = {
        task:"",
        inputEmpty:"d-none",
        taskList: JSON.parse(localStorage.getItem("task")),
        show:false,
        editTitle:"",
        editIndex:-1,
        editText:""
    }
    constructor(props){
        super(props)
        if(localStorage.length === 0){
            localStorage.setItem("task","[]");
        }  
    }
    onChangeTask= (e)=>{
        this.setState({
            task: e.target.value
        });
    }
    onChangeEdit= (e)=>{
        this.setState({
            editText: e.target.value
        });
    }
    addTaskHandler= () =>{
        if(this.state.task ===""){
            this.setState({
                inputEmpty:""
            });
        }else{
            var task = JSON.parse(localStorage.getItem("task"));
            task.push(this.state.task);
            localStorage.setItem("task",JSON.stringify(task.sort()));
            document.getElementById("inputTask").value='';
            this.setState({
                task:"",
                inputEmpty:"d-none",
                taskList:[...this.state.taskList,this.state.task],
                taskList:task
            })
        }    
    }
    deleteTask =(num)=>{
        var tasks = JSON.parse(localStorage.getItem("task"));
        var afterDelete = tasks.filter(function (t){return t !== tasks[num]})
        localStorage.setItem("task",JSON.stringify(afterDelete));
        this.setState({
            taskList:afterDelete
        })
    }
    handleCloseModal =()=>{
        this.setState({
            show:false
        })
    }
    editTask = (num) =>{
        var tasks = JSON.parse(localStorage.getItem("task"));
        this.setState({
            show:true,
            editTitle:tasks[num],
            editIndex:num
        })
    }
    saveEditChange = ()=>{
        var tasks = JSON.parse(localStorage.getItem("task"));
        tasks[this.state.editIndex] = this.state.editText;
        localStorage.setItem("task",JSON.stringify(tasks));
        this.setState({
            taskList:tasks,
            show:false
        })
    }
    render(){
        return(
            <React.Fragment>
                <h3>Todo List</h3>
                <div className="container mt-3">
                    <p>Create your tasks here:</p>
                    <div className="input-group">
                        <input type="text" className="form-control" placeholder="Task title" id="inputTask" onChange={this.onChangeTask}></input>
                        <div className="input-group-append">
                            <button className="btn btn-warning" id="addBt" onClick={this.addTaskHandler}>Add Task</button>
                        </div>
                    </div>
                    <span className={this.state.inputEmpty} id="required">You required to fill your task!!!</span>
                    <div className="container px-5 mt-3">
                        <p>Your Task</p>
                        <DisplayTask myTask={this.state.taskList} onDelete={this.deleteTask} onEdit={this.editTask}/>
                    </div>
                    
                </div>
                <Modal
                        show={this.state.show}
                        onHide={this.handleCloseModal}
                        backdrop="static"
                        keyboard={false}
                    >
                        <Modal.Header closeButton>
                        <Modal.Title>{this.state.editTitle} Task</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                        <input type="text" className="form-control" placeholder="Edit task title" id="editTask" onChange={this.onChangeEdit}></input>
                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleCloseModal}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={this.saveEditChange}>Save Change</Button>
                        </Modal.Footer>
                </Modal>
            </React.Fragment>
        );
    }
}

export default Todo;