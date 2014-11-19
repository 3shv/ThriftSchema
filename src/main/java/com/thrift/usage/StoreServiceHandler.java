package com.thrift.usage;

import org.apache.thrift.TException;

import com.thrift.usage.user.*;

public class StoreServiceHandler implements StoreService.Iface {

	@Override
	public int store(User user) throws InvalidData, TException {
		// TODO Auto-generated method stub
		
		System.out.println("Received info "+user.toString());
		
		return 0;
	}

}
