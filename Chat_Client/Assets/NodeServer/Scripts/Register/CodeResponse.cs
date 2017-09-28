using SocketIO;
using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class CodeResponse : MonoBehaviour
{
    public InputField input;
    public SocketIOComponent Socket;
    public Button button;
    private void Start()
    {
        Socket.On("return_verfication", ReturnVerfication);
    }

    private void ReturnVerfication(SocketIOEvent obj)
    {
        if (obj.data["success"].b)
        {
            Application.LoadLevel("Register");
        }
        else
        {
            Debug.Log("Please enter the code..............");
        }
    }

    public void SendVerifyCode()
    {
        var code = input.text.ToString();
        Dictionary<string, string> p = new Dictionary<string, string>();
        p.Add("code", code);
        Socket.Emit("respose", new JSONObject(p));
    }
    void Awake()
    {
        GameObject go = GameObject.Find("SocketIO");
        Socket = go.GetComponent<SocketIOComponent>();
    }
}
