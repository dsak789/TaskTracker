import streamlit as st
# import requests
import authentication as auth
import Tasks as tks


st.set_page_config(
    page_title="Task Tracker",
    menu_items=None,
    initial_sidebar_state="auto",
    layout="centered",
    page_icon="👨🏻‍💻",
    
)


st.header("👨🏻‍💻 Task Tracker")
# st.session_state.login="AJJU1437"

if "login" not in st.session_state:
    auth.authentication()
else:
    st.sidebar.write("Login as ",st.session_state["login"])


    tks.tasks()

    
    
    if st.sidebar.button("Logout"):
        del st.session_state.login 