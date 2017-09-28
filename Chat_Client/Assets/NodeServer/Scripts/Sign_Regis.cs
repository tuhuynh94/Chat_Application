using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class Sign_Regis : MonoBehaviour {    

    public void LoadSignIn()
    {
        Application.LoadLevel("Sign In");
    }
    public void LoadRegister()
    {
        //Application.LoadLevel("Phone Number");
        Application.LoadLevel("Register");
    }

}
