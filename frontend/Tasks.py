import streamlit as st 
import requests as req 
import pandas as pd
import folium

def addtask():
    addtaskend = 'http://127.0.0.1:8000/addtask'
    title = st.text_input("Enter Task Title")
    description = st.text_input("Description of Task")
    status = st.selectbox("Status",["Todo","In Progress","Completed"])
    prior = st.slider("Priority")
    if st.button("ADD TASK"):
        taskdata={
            "id":prior,
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
    adminsend = 'http://localhost:8000/tasks'
    resposnes = req.get(adminsend)
    if resposnes.status_code == 200:
        st.write("ALL TASKS")
        # st.json(resposnes.json())
        resposnes = resposnes.json()
        # if "message" in resposnes:
        #     st.write("Tasks There")
        # else:
        #     st.write("Tasks not There")
        resposnes = resposnes["Tasks"]
        for res in resposnes:
            c= st.container()
            c.success(f"{res['title']}")
            c.write(f" {res['description']}")
            # st.write(f"Title: , Description:, Status: {res['status']}")
            c.caption(f"{res['status']}")
    else:
        st.error(f"Failed to get data. Status Code is {resposnes.status_code}")
    
def tasks():
     tab1, tab2 = st.tabs(["All TASKS","Add New TASK"])
     with tab1:
         gettasks()
     with tab2:
         addtask()

