using SocketIO;
using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class CodeRequest : MonoBehaviour
{
    public InputField input;
    public SocketIOComponent Socket;
    public Button button;
    private void Start()
    {
        Socket.On("return_verfication_code", ReturnVerficationCode);
    }

    private void ReturnVerficationCode(SocketIOEvent obj)
    {
        if (obj.data["success"].b)
        {
            Application.LoadLevel("Verify Code");
        }
        else
        {
            Application.LoadLevel("Phone Number");
        }
    }

    public void SendRequestVerify()
    {
        Dictionary<string, string> p = new Dictionary<string, string>();
        NodeServer.Self.m_owner.m_client_id = input.text.ToString();
        p.Add("phone", input.text.ToString());
        Socket.Emit("request", new JSONObject(p));       
    }
    void Awake()
    {
        GameObject go = GameObject.Find("SocketIO");
        Socket = go.GetComponent<SocketIOComponent>();
    }
}
