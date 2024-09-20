import streamlit as st 
import requests as req 
from uuid import uuid4
from datetime import date as dt


# apiurl = "https://tasktrackerapi.vercel.app"
apiurl = "https://tasktrackerapinv2.vercel.app/task"  
# apiurl = "http://localhost:8000/task"

def addtask():
    addtaskend = f'{apiurl}/addtask'
    title = st.text_input("Enter Task Title")
    description = st.text_input("Description of Task")
    status = st.selectbox("Status",["Todo","In Progress","Completed"])
    adddate = str(dt.today())
    id = uuid4().hex
    userid = st.session_state.userid


    if st.button("ADD TASK"):
        taskdata={
            "id":id,
            "userid":userid,
            "title":title,
            "description":description,
            "status":status,
            "adddate" : adddate,
        }
        res = req.post(addtaskend,json=taskdata)
        if res.status_code == 200:
            st.success("New Task Added")
            st.balloons()
            st.rerun()
        else:
            st.error("Error adding task")

def gettasks():
    userid = st.session_state.userid
    adminsend = (f'{apiurl}/tasks/{userid}')
    resposnes = req.get(adminsend)
    if resposnes.json()["message"]=="Data Retrieved":
        # st.json(resposnes.json())
        resposnes = resposnes.json()['Tasks']
        if len(resposnes) == 0:
            st.warning("Tasks not There or No Tasks Added Yet")
        visualizetasks(resposnes)
    else:
        st.warning(f"{resposnes.json()['message']}")
    
def visualizetasks(tasks):
    for res in tasks:
        c= st.container()
        c.subheader(f":red[{res['title']}]")
        c.markdown(f"### {res['description']}")
        if res['status'] != 'Completed' :
            c.write(f"Status: :orange[{res['status'] }]")
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
                        uptend = (f'{apiurl}/updatetask/{id}/{btn}')
                        delend = (f'{apiurl}/deletetask/{id}')
                        query = delend if btn == 'Delete' else uptend
                        req.get(query)
                        st.rerun()
                st.warning("Task once Deleted Task cannot be Retrived. Instead you can Archieve the Task")    
        else:
            c.success("Task Completed")

def completed_tasks():
    userid = st.session_state.userid
    adminsend = (f'{apiurl}/completed-tasks/{userid}')
    resposnes = req.get(adminsend)
    if resposnes.json()["message"]=="Data Retrieved":
        st.write("ALL TASKS")
        # st.json(resposnes.json())
        resposnes = resposnes.json()['Tasks']
        if len(resposnes) == 0:
            st.warning("Tasks not Completed or No Tasks Added Yet")
        visualizetasks(resposnes)
    else:
        st.warning(f"{resposnes.json()['message']}")

def archieved_tasks():
    userid = st.session_state.userid
    adminsend = (f'{apiurl}/archieved-tasks/{userid}')
    resposnes = req.get(adminsend)
    if resposnes.json()["message"]=="Data Retrieved":
        # st.write("ALL TASKS")
        # st.json(resposnes.json())
        resposnes = resposnes.json()['Tasks']
        if len(resposnes) == 0:
            st.warning("Tasks not Archieved or No Tasks Added Yet")
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

