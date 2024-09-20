import streamlit as st
import requests as req
import authentication 
import Tasks as tks
st.set_page_config(
    page_title="Task Tracker",
    menu_items=None,
    initial_sidebar_state="auto",
    layout="centered",
    page_icon="🎯",
    
)

apiurl = "https://tasktrackerapinv2.vercel.app/user"
# apiurl = "http://localhost:8888/user"

st.header("🎯 Task Tracker ")
# st.session_state.login="AJJU1437"
hide_streamlit_style = """
    <style>
        .ViewerBadge_container__1QSob , #MainMenu{visibility: hidden;}
        div{
        font-family:'Times New Roman','Arial Narrow', Arial, sans-serif;
           }        
    </style>
"""
st.markdown(hide_streamlit_style, unsafe_allow_html=True)

def setting():
    st.sidebar.write("Profile Settings: ")
    with st.sidebar.expander("Password Change",expanded=False):
        username = st.session_state['userid']
        oldpwd = st.text_input("Enter Previous Password",type='password')
        newpwd = st.text_input("Enter New Password",type='password')
        if st.button("Change Password"):
            pwddata={
                "username":username,
                "oldPassword":oldpwd,
                "newPassword":newpwd
            }
            res = req.post(f'{apiurl}/changepassword',json=pwddata)
            if res == 200:
                st.sidebar.success("Password Changed Successfully")
                st.balloons()
        # st.write("Page still in Future work 😜")

if "login" not in st.session_state:
    authentication.authorization()
else:
    st.sidebar.write(f"Hey..! :orange[{st.session_state.login}]")
    st.sidebar.image(st.session_state.image,width=170,output_format="auto")

    tks.tasks()
    # settings = st.sidebar.button(" ⚙️ Settings")
    # if settings:
    #     pass
    c = st.container()  
    with c:
        setting()
            
    if st.sidebar.button("⬅️ Logout"):
        del st.session_state.login 
        st.rerun()