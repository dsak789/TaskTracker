import streamlit as st
import requests as req

# apiurl = "https://tasktrackerapi.vercel.app"
# apiurl = "https://tasktrackerapinv2.vercel.app/user"
apiurl = "http://localhost:8888/user"

def getdp(gitid):
    git = req.get(f'https://api.github.com/users/{gitid}')
    if git.status_code == 200:
        if git.json() and git.json()['login'].lower() == gitid.lower():
            dpurl= git.json()['avatar_url'] if git.json()['avatar_url'] != "" else "https://avatars.githubusercontent.com/u/9919?v=4"
            return dpurl
    if git.status_code == 404:
        return "https://static.vecteezy.com/system/resources/previews/000/649/115/original/user-icon-symbol-sign-vector.jpg"
    else:
        return"https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png"
    

def login():
    st.header("LOGIN")
    usernm = st.text_input("Enter Username:")
    usrpwd = st.text_input("Password",type="password")
    if st.button("LOGIN"):
        payload = {"username":usernm, "password":usrpwd}        
        reqstatus = req.post(f'{apiurl}/login',json=payload)
        if reqstatus.status_code == 200:
            res=reqstatus.json()
            if res['message'] == "Login Successfull":
                st.session_state['image']= getdp(res['user']['githubid']) 
                st.session_state["login"] = res['user']['name']
                st.session_state["userid"] = res['user']['username']
                st.session_state["githubid"] = res['user']['githubid']
                st.success('Login Success')
                st.rerun()
                

            else:
                st.error(f"Invalid Credential! Please Tryagain..{str(res['message'])}")
        else:
            print(reqstatus.json())
            st.error(reqstatus.json()['message'])
    with st.expander("Forgot Password...?"):
        forgotpassword()
def forgotpassword():
    fpusernm = st.text_input("Username:")
    if st.button("Reset Password"):
        res = req.post(f'{apiurl}/forgotpassword',json={'username':fpusernm})
        if res.status_code == 200:
            st.success("Password Reset Done")



def register():
    st.header("REGISTER")
    name = st.text_input("Enter Your Name")
    githubid = st.text_input("Enter GitHub Username ")
    invalid_gitid = False
    if githubid.startswith('https://github.com/') or 'github.com' in githubid or '/' in githubid:
        # githubid=githubid[len("https://github.com/")] 
        st.warning("Just enter your github username. Please Remove :red[`https://gihub.com/`] or  :red[`gihub.com/`] or :red[`/`] if present..")
        invalid_gitid = True
    email = st.text_input("Enter Email")
    usernm = st.text_input("Enter Username")
    usepwd = st.text_input("Type Password",type='password')
    st.caption("Password length should be 7 Chars and combination of AlphaNumeric and Special Chars")
    cnfuserpwd = st.text_input("Confirm Password",type='password')
    if usepwd != cnfuserpwd:
        st.warning("Password Mismath...!")
    if st.button("Register", disabled=invalid_gitid):
        regiend = f'{apiurl}/adduser'
        regidata = {
            "id":0,
            "name":name,
            "email":email,
            "githubid":githubid,
            "username":usernm,
            "password":usepwd 
        }
        res = req.post(regiend,json=regidata)
        if res.status_code == 200:
            st.success("Registration Successfull")
            st.rerun()
    if invalid_gitid:
        st.error("Please Check errors in above Fields ")
def authorization():
    tab1,tab2 = st.tabs(["Login","Register"])
    with tab1:
        login()
    with tab2:
        register()