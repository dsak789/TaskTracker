import streamlit as st
import requests as req

def login():
    st.header("LOGIN")
    usernm = st.text_input("Enter Username:")
    usrpwd = st.text_input("Password",type="password")
    if st.button("LOGIN"):

        payload = {"username":usernm, "password":usrpwd}        
        reqstatus = req.post('http://localhost:8000/login',json=payload)
        if reqstatus.status_code == 200:
            res=reqstatus.json()
            if res['message'] == "Login Successfull":
                st.balloons()
                st.sidebar.write(res['user']['name'])
                st.sidebar.write(res['user']['githubid'])
                st.session_state["login"] = res['user']['name']
                st.session_state["userid"] = res['user']['username']
            # st.balloons()
            # st.sidebar.write("Role",reqstatus.json())['role']
            # st.sidebar.json(reqstatus.json())

        else:
            st.error(reqstatus)

 
def register():
    st.header("REGISTER")
    name = st.text_input("Enter Your Name")
    designation = st.text_input("Enter GitHub Id")
    email = st.text_input("Enter Email")
    usernm = st.text_input("Enter Username")
    usepwd = st.text_input("Type Password")
    cnfuserpwd = st.text_input("Confirm Password")
    if st.button("Register"):
        regiend = 'http:'
        regi = {
            "id":"",
            "name":name,
            "email":email,
            "username":usernm,
            "password":usepwd 
        }
        res = req.post()
        st.session_state.name = name
        st.write(st.session_state.name)
        st.success("Registration Successfull")
        st.balloons()
        st._rerun()

def authentication():
    tab1,tab2 = st.tabs(["Login","Register"])

    with tab1:
        login()
    with tab2:
        register()