import React, { useState } from 'react'
import "./styles.css"
import Input from '../Input/Input';
import Button from '../Button/Button';
import {  createUserWithEmailAndPassword ,signInWithEmailAndPassword,  signInWithPopup, GoogleAuthProvider} from "firebase/auth";
import { toast } from 'react-toastify';
import { auth,db } from '../../Firebase';
import { doc, getDoc, setDoc } from "firebase/firestore"; 
import { useNavigate } from 'react-router-dom';



function SignupSigninComponent() {
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [confirmPassword,setConfirmPassword]=useState("");
  const [loading,setLoading]=useState(false);
  const [loginForm,setLoginForm]=useState(false);
  const navigate=useNavigate();


  function signupWithEmail(){
    setLoading(true);
    console.log("Name:",name);
    console.log("Email:",email);
    console.log("Password:",password);
    console.log("ConfirmPassword:",confirmPassword);

    if(name!="" && email!="" && password!="" && confirmPassword!=""){
      if(password==confirmPassword){
    createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    console.log("User>>>",user);
    toast.success("User Created!");
    setLoading(false);
    
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    createDoc(user);
    navigate("/dashboard");
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    toast.error(errorMessage)
     setLoading(false);
    // ..
  });
}else{
  toast.error("Password and Confirm Password don't match!");
}
}else{
  toast.error("All fields are mandatory!");
   setLoading(false);
}
  }
  
  function loginUsingEmail(){
    console.log("Email:",email);
    console.log("Password:",password);
    setLoading(true);
 if(email!="" && password!="" ){
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    toast.success("User Logged In!");
    console.log("User logged in",user);
    createDoc(user);
    setLoading(false);
    navigate("/dashboard");
    
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setLoading(false);
    toast.error(errorMessage)
  });
 }else{
  toast.error("All fields are mandatory!");
  setLoading(false);
 }


    
  }



 async function createDoc(user){
  setLoading(true);
  if(!user) return;
  const userRef=doc(db,"users",user.uid);
  const userData=await getDoc(userRef);
  if(!userData.exists()){
try{
await setDoc(doc(db, "users", user.uid), {
  name:user.displayName ? user.displayName:name,
  email:user.email,
  photoURL:user.photoURL ? user.photoURL : "",
createdAt:new Date(),
});
toast.success("Doc created!");
setLoading(false);
}catch(e){
  toast.error(e.message);
  setLoading(false);
}

  }else{
    // toast.error("Doc already exists");
    setLoading(false);
  }
}

    
function googleAuth(){
  setLoading(true);
  const provider = new GoogleAuthProvider();

  try {
    signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    console.log("User>>>",user);
    createDoc(user);
    setLoading(false);
    navigate("/dashboard");
    toast.success("User authenticated!");
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    setLoading(false);
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    toast.error(errorMessage);
   
  })
  } catch (error) {
    setLoading(false);
    toast.error(error.message);
  }
  
}
    
  
  return (
    <>
    {loginForm? (  <div className="signup-wrapper">
      <h2 className='title'>
        Login On <span style={{color:"var(--theme)"}}>Financely.</span>
      </h2>
      <form>
        {/* <Input type="text" label={"Full Name"} state={name} setState={setName} placeholder={"abc"} /> */}
        <Input type="email" label={"Email"} state={email} setState={setEmail} placeholder={"abc@123"} />
        <Input type="password" label={"Password"} state={password} setState={setPassword} placeholder={"Example123"} />
        {/* <Input type="password" label={"Confirm Password"} state={confirmPassword} setState={setConfirmPassword} placeholder={"Example123"} /> */}
        <Button disabled={loading} onClick={loginUsingEmail} text={loading?"Loading...":"Signup Using Email and Password"}  />
        <p className="p-login" onClick={()=>setLoginForm(!loginForm)} style={{cursor:"pointer"}} >Or Don't Have an Account? Click Here</p>
        <Button onClick={googleAuth} text={loading?"loading...":"Signup Using Google"} blue={true}/>
      </form>
    </div>
    ):(
       <div className="signup-wrapper">
      <h2 className='title'>
        Sign Up on <span style={{color:"var(--theme)"}}>Financely.</span>
      </h2>
      <form>
        <Input type="text" label={"Full Name"} state={name} setState={setName} placeholder={"abc"} />
        <Input type="email" label={"Email"} state={email} setState={setEmail} placeholder={"abc@123"} />
        <Input type="password" label={"Password"} state={password} setState={setPassword} placeholder={"Example123"} />
        <Input type="password" label={"Confirm Password"} state={confirmPassword} setState={setConfirmPassword} placeholder={"Example123"} />
        <Button disabled={loading} text={loading?"Loading...":"Signup Using Email and Password"} onClick={signupWithEmail} />
        <p className="p-login"  >or</p>
        <Button onClick={googleAuth} text={loading?"loading...":"Signup Using Google"} blue={true}/>
        <p className="p-login" style={{cursor:"pointer"}} onClick={()=>setLoginForm(!loginForm)}>Or Have An Account Already ? Click Here</p>
      </form>
    </div>
    )
    }
 
    </>
  )

}
export default SignupSigninComponent;