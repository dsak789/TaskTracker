import streamlit as st
import authentication 
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
        div{
        font-family:cursive,'Times New Roman','Arial Narrow', Arial, sans-serif;
           }        
    </style>
"""
st.markdown(hide_streamlit_style, unsafe_allow_html=True)

def setting():
    c = st.sidebar.container()
    with c:
        st.write("Profile Settings ")
        st.write("Page still in Future work 😜")

if "login" not in st.session_state:
    authentication.authorization()
else:
    st.sidebar.write(f"Hey..! :orange[{st.session_state.login}]")
    st.sidebar.image(st.session_state.image)

    tks.tasks()
    settings = st.sidebar.button(" ⚙️ Settings")
    if settings:
        c = st.container()  
        with c:
            setting()
            
    if st.sidebar.button("⬅️ Logout"):
        del st.session_state.login 
        st.experimental_rerun()