//
//  CouchbaseLite.m
//  Tablet
//
//  Created by YenPepper on 2015/11/29.
//  Copyright © 2015年 Facebook. All rights reserved.
//

#import "CouchbaseLite.h"

@implementation CouchbaseLite

RCT_EXPORT_MODULE()

CBLManager *manager;

RCT_EXPORT_METHOD(connectToCouchbaseLite: (RCTResponseSenderBlock)callback){
  // create a shared instance of CBLManager
  self.manager = [CBLManager sharedInstance];
  if (!self.manager) {
    NSString *errorMessage = @"Cannot create shared instance of CBLManager";
    callback(@[errorMessage]);
    NSLog(@"Error: %@", errorMessage);
    return;
  }
  callback(@[]);
  NSLog (@"Manager created");
}

RCT_EXPORT_METHOD(createDatabase:(NSString *)dbName callback:(RCTResponseSenderBlock)callback){
  NSError *error;
  
  // Check database name
  if (![CBLManager isValidDatabaseName: dbName]) {
    callback(@[@"Bad database name"]);
    return;
  }
  
  // create a new database
  self.database = [self.manager databaseNamed: dbName error: &error];
  if (!self.database) {
    callback(@[[@"Cannot create database. Error message: " stringByAppendingString: error.localizedDescription]]);
    return;
  }
  
  // log the database location
  NSString *databaseLocation = [[[[NSBundle mainBundle] bundlePath] stringByDeletingLastPathComponent] stringByAppendingString: @"/Library/Application Support/CouchbaseLite"];
  callback(@[[NSNull null], [NSString stringWithFormat:@"%@/%@%@", databaseLocation, dbName, @".cblite"]]);
}

RCT_EXPORT_METHOD(databaseAction:(NSArray *)actionList){
  for(NSDictionary *action in actionList){
    NSString *type = [action valueForKey:@"type"];
    if(type){
      if([type isEqualToString:@"create"]){
        NSLog(@"In the create action!!!");
      }
      else{
        NSLog(@"Action not support: %@", type);
      }
    }
  }
}

RCT_EXPORT_METHOD(createDocument:(NSDictionary *)properties callback:(RCTResponseSenderBlock)callback){
  CBLDocument* document = [self.database createDocument];
  NSError* error;
  if (![document putProperties: properties error: &error]) {
    callback(@[[@"Cannot create document. Error message: " stringByAppendingString: error.localizedDescription]]);
  }
  else{
    callback(@[[NSNull null], document.properties]);
  }
}

RCT_EXPORT_METHOD(readDocument:(NSString *)documentId callback:(RCTResponseSenderBlock)callback){
  CBLDocument* document = [self.database existingDocumentWithID: documentId];
  if(!document){
    callback(@[[@"Document not exist with id: " stringByAppendingString: documentId]]);
  }
  else{
    callback(@[[NSNull null], document.properties]);
  }
}

@end

