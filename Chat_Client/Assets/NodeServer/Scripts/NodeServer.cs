using SocketIO;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System;

public class NodeServer : MonoBehaviour {

    public static NodeServer Self;
    public SocketIOComponent Socket;

    public mClient m_owner;

    void Awake()
    {
        Self = this;
        Application.runInBackground = true;
        DontDestroyOnLoad(gameObject);

        NodeServer[] ns = FindObjectsOfType<NodeServer>();
        if (ns.Length > 1)
        {
            foreach (NodeServer i in ns)
            {
                if (i.gameObject.name.Equals("ServerNodeJS-1"))
                {
                    DestroyImmediate(i.gameObject);
                }
            }
        }
        gameObject.name = "ServerNodeJS-1";


        GameObject go = GameObject.Find("SocketIO");
        Socket = go.GetComponent<SocketIOComponent>();


        m_owner = new mClient();
        m_owner.m_client_id = "-1";
    }
    // Use this for initialization
    void Start () {
        Socket.Connect();
    }
}
