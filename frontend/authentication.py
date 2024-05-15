import streamlit as st
import requests as req
import bcrypt



def getdp(gitid):
    git = req.get(f'https://api.github.com/users/{gitid}')
    return git.json()['avatar_url'] if git.json()['avatar_url'] != "" else "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png"


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
                st.session_state['image']= getdp(res['user']['githubid'])
                st.session_state["login"] = res['user']['name']
                st.session_state["userid"] = res['user']['username']
                st.session_state["githubid"] = res['user']['githubid']
                st.balloons()
                st.experimental_rerun
            else:
                st.error("Invalid Credential! Please Tryagain..")
        else:
            st.error(reqstatus)
def encryptpwd(pwd : str):
    salt = bcrypt.gensalt()
    hashed_pwd = bcrypt.hashpw(pwd.encode('utf-8'),salt)
    print(hashed_pwd.decode('utf-8'))
    return hashed_pwd.decode('utf-8')


def register():
    st.header("REGISTER")
    name = st.text_input("Enter Your Name")
    githubid = st.text_input("Enter GitHub Id")
    email = st.text_input("Enter Email")
    usernm = st.text_input("Enter Username")
    usepwd = st.text_input("Type Password",type='password')
    st.caption("Password length should be 7 Chars and combination of AlphaNumeric and Special Chars")
    cnfuserpwd = st.text_input("Confirm Password",type='password')
    if usepwd != cnfuserpwd:
        st.warning("Password Mismath...!")
    if st.button("Register"):
        regiend = 'http://localhost:8000/adduser'
        regidata = {
            "id":0,
            "name":name,
            "email":email,
            "githubid":githubid,
            "username":usernm,
            "password":encryptpwd(usepwd) 
        }
        res = req.post(regiend,json=regidata)
        if res.status_code == 200:
            st.success("Registration Successfull")
            st.balloons()
            st._rerun()

def authentication():
    tab1,tab2 = st.tabs(["Login","Register"])

    with tab1:
        login()
    with tab2:
        register()