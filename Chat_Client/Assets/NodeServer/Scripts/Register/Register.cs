using SocketIO;
using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class Register : MonoBehaviour {
    public InputField username;
    public InputField pass;
    public SocketIOComponent Socket;
    public Button button;

    private void Start()
    {
        Socket.On("return_register", ReturnRegister);
    }

    private void ReturnRegister(SocketIOEvent obj)
    {
        if (obj.data["success"].b)
        {
            Debug.Log(obj.data["info"].str);
            Application.LoadLevel("Sign In");
        }
        else
        {
            Debug.Log(obj.data["info"].str);
        }
    }

    public void SendRegister()
    {
        Dictionary<string, string> p = new Dictionary<string, string>();
        p.Add("phone", NodeServer.Self.m_owner.m_client_id);
        p.Add("username", username.text.ToString());
        p.Add("pass", pass.text.ToString());
        Socket.Emit("register", new JSONObject(p));
    }
    void Awake()
    {
        GameObject go = GameObject.Find("SocketIO");
        Socket = go.GetComponent<SocketIOComponent>();
    }
}
