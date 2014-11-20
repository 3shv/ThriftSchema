package com.thrift.usage;

import org.apache.thrift.server.THsHaServer;
import org.apache.thrift.server.TServer;
import org.apache.thrift.transport.TNonblockingServerSocket;
import org.apache.thrift.transport.TNonblockingServerTransport;
import org.apache.thrift.transport.TTransportException;

import com.thrift.usage.user.*;


public class Server {
	public static void main(String[] args) {
		StoreService.Processor<StoreServiceHandler> processor = new StoreService.Processor<StoreServiceHandler>(
				new StoreServiceHandler());
		System.out.println("Starting server");
		
		try {
			TNonblockingServerTransport serverTransport = new TNonblockingServerSocket(9090);
			TServer server = new THsHaServer(new THsHaServer.Args(serverTransport).processor(processor));
			
			server.serve();
			
			System.out.println("Started server at port 9090");
		}catch(Exception e){
			e.printStackTrace();
		}
		
		
	}
}
