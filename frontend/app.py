import streamlit as st
# import requests
import authentication as auth
import Tasks as tks
st.set_page_config(
    page_title="Task Tracker",
    menu_items=None,
    initial_sidebar_state="auto",
    layout="centered",
    page_icon="🎯",
    
)


st.header("🎯 Task Tracker ")
# st.session_state.login="AJJU1437"
hide_streamlit_style = """
    <style>
        .ViewerBadge_container__1QSob , #MainMenu{visibility: hidden;}
    </style>
"""
st.markdown(hide_streamlit_style, unsafe_allow_html=True)

def setting():
    c = st.sidebar.container()
    with c:
        st.write("Profile Settings")

if "login" not in st.session_state:
    auth.authentication()
else:
    st.sidebar.write("Login as ",st.session_state["login"])
    st.sidebar.image(st.session_state.image)

    tks.tasks()
    settings = st.sidebar.button(" ⚙️ Settings")
    if settings:
        c = st.container()  
        with c:
            setting()
            
    if st.sidebar.button("⬅️ Logout"):
        del st.session_state.login 
