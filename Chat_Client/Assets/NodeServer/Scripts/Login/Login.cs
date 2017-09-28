using SocketIO;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using System;

public class Login : MonoBehaviour {
    public SocketIOComponent Socket;
    public Text username;
    public Text pass;

    void Start()
    {
        Socket.On("return_login", Return);
    }

    private void Return(SocketIOEvent obj)
    {
        if (obj.data["success"].b)
        {
            Debug.Log("Login success");
        }
        else
        {
            Application.LoadLevel("Sign In");
        }
    }

    public void SendSignIn()
    {
        Dictionary<string, string> p = new Dictionary<string, string>();
        p.Add("username", username.ToString());
        p.Add("pass", pass.ToString());
        Socket.Emit("login", new JSONObject(p));
    }

    void Awake()
    {
        GameObject go = GameObject.Find("SocketIO");
        Socket = go.GetComponent<SocketIOComponent>();
    }
}
