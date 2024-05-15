import streamlit as st 
import requests as req 

def addtask():
    addtaskend = 'http://127.0.0.1:8000/addtask'
    title = st.text_input("Enter Task Title")
    description = st.text_input("Description of Task")
    status = st.selectbox("Status",["Todo","In Progress","Completed"])
    prior = st.slider("Priority")
    githubid = st.session_state.userid


    if st.button("ADD TASK"):
        taskdata={
            "id":prior,
            "userid":githubid,
            "title":title,
            "description":description,
            "status":status
        }
        res = req.post(addtaskend,json=taskdata)
        if res.status_code == 200:
            st.success("New Task Added")
            st.balloons()
            st._rerun()
        else:
            st.error("Error adding task")

def gettasks():
    githubid = st.session_state.userid
    adminsend = (f'http://localhost:8000/tasks/{githubid}')
    resposnes = req.get(adminsend)
    if resposnes.json()["message"]=="Data Retrieved":
        st.write("ALL TASKS")
        # st.json(resposnes.json())
        resposnes = resposnes.json()['Tasks']
        # if "message" in resposnes:
        #     st.write("Tasks There")
        # else:
        #     st.write("Tasks not There")
        # resposnes = resposnes["Tasks"]
        visualizetasks(resposnes)
    else:
        st.warning(f"{resposnes.json()['message']}")
    
def visualizetasks(tasks):
    for res in tasks:
        c= st.container()
        c.warning(f"{res['title']}")
        c.caption(f" {res['description']}")
        c.write(f"Status: {res['status']}")
        if res['status'] != "Completed":
            if res['status'] == "Todo":
                drop = ["In Progress","Completed","Delete","Archieve"] 
            elif res['status'] == "Archieve":
                drop = ["Todo","In Progress","Completed","Delete"] 
            else :
                drop =["Todo","Completed","Delete","Archieve"]
            # status = st.radio("",drop,key=res['_id'])
            with st.expander("Update Status"):
                for btn in drop:
                    if st.button(btn,key=f"{btn}_{res['_id']}"):
                        id = res['id']
                        uptend = (f'http://localhost:8000/updatetask/{id}/{btn}')
                        delend = (f'http://localhost:8000/deletetask/{id}')
                        query = delend if btn == 'Delete' else uptend
                        req.get(query)
                        st.experimental_rerun()
                st.warning("Task once Deleted Task cannot be Retrived. Instead you can Archieve the Task")    
        else:
            c.success("Task Completed")
    # if status :
    #     id = res['id']
    #     uptend = (f'http://localhost:8000/updatetask/{id}/{status}')
    #     req.get(uptend)
        st.markdown("")

def completed_tasks():
    githubid = st.session_state.userid
    adminsend = (f'http://localhost:8000/completed-tasks/{githubid}')
    resposnes = req.get(adminsend)
    if resposnes.json()["message"]=="Data Retrieved":
        st.write("ALL TASKS")
        # st.json(resposnes.json())
        resposnes = resposnes.json()['Tasks']
        # if "message" in resposnes:
        #     st.write("Tasks There")
        # else:
        #     st.write("Tasks not There")
        # resposnes = resposnes["Tasks"]
        visualizetasks(resposnes)
    else:
        st.warning(f"{resposnes.json()['message']}")

def archieved_tasks():
    githubid = st.session_state.userid
    adminsend = (f'http://localhost:8000/archieved-tasks/{githubid}')
    resposnes = req.get(adminsend)
    if resposnes.json()["message"]=="Data Retrieved":
        st.write("ALL TASKS")
        # st.json(resposnes.json())
        resposnes = resposnes.json()['Tasks']
        # if "message" in resposnes:
        #     st.write("Tasks There")
        # else:
        #     st.write("Tasks not There")
        # resposnes = resposnes["Tasks"]
        visualizetasks(resposnes)
    else:
        st.warning(f"{resposnes.json()['message']}")


def tasks():

    all_tasks, completedtasks,newtask,archieved = st.tabs(["📋 All Tasks"," ✅ Completed Tasks"," ➕ Add New TASK", "📥 Archieved Tasks"])
    with all_tasks:
        gettasks()
    with completedtasks:
        completed_tasks()
    with newtask:
        addtask()
    with archieved:
        archieved_tasks()

