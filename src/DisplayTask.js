import React from 'react';

class DisplayTask extends React.Component{

    
    render(){
        return(
            <React.Fragment>
                { 
                    this.props.myTask.map(
                        (task,index) => 
                    <li className="list-group-item list-group-item-action list-group-item-light d-flex justify-content-between align-items-center" key={index}>
                        {task}
                        <span> 
                            <button type="button" className="btn btn-warning edit" data-toggle="modal" data-target="#myModal" onClick={()=>{this.props.onEdit(index)}}><i className="fas fa-edit"></i> </button>  
                            <button type="button" className="btn btn-danger delete" onClick={()=>{this.props.onDelete(index)}}><i className="fas fa-trash"></i> </button>
                        </span>
                    </li>
                    )
                }
            </React.Fragment>
        );
    }
}

export default DisplayTask;