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
        c.success(f"{res['title']}")
        c.caption(f" {res['description']}")
        # st.write(f"Title: , Description:, Status: {res['status']}")
        c.write(f"Status: {res['status']}")
        if res['status'] != "Completed":
            drop = ["In Progess","Completed"] if res['status'] == "Todo" else ["Todo","Completed"]
            # status = st.radio("",drop,key=res['_id'])
            with st.expander("Update Status"):
                for btn in drop:
                    if st.button(btn,key=f"{btn}_{res['_id']}"):
                        id = res['id']
                        uptend = (f'http://localhost:8000/updatetask/{id}/{btn}')
                        req.get(uptend)
                        st.experimental_rerun()
        else:
            c.success("Task Completed")
    # if status :
    #     id = res['id']
    #     uptend = (f'http://localhost:8000/updatetask/{id}/{status}')
    #     req.get(uptend)
        st.markdown("")

def tasks():
     tab1, tab2 = st.tabs(["All TASKS","Add New TASK"])
     with tab1:
         gettasks()
     with tab2:
         addtask()

