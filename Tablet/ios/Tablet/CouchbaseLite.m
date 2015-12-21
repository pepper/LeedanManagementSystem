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

RCT_EXPORT_METHOD(connectToCouchbaseLite:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject){
  // create a shared instance of CBLManager
  dispatch_async(dispatch_get_main_queue(), ^(){
    self.manager = [CBLManager sharedInstance];
    if (!self.manager) {
      NSError *error = [NSError errorWithDomain:@"Cannot create shared instance of CBLManager" code:-101 userInfo:nil];
      NSLog(@"Error: %@", error);
      reject(error);
      return;
    }
    NSLog (@"Manager created");
    resolve([self.manager allDatabaseNames]);
  });
}

RCT_EXPORT_METHOD(createDatabase:(NSString *)dbName resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject){
  dispatch_async(dispatch_get_main_queue(), ^(){
    NSError *error;
    
    // Check database name
    if (![CBLManager isValidDatabaseName: dbName]) {
      error = [NSError errorWithDomain:@"Bad database name" code:-103 userInfo:nil];
      reject(error);
      return;
    }
    
    // create a new database
    self.database = [self.manager databaseNamed: dbName error: &error];
    if (!self.database) {
      reject(error);
      return;
    }
    
    // log the database location
    NSString *databaseLocation = [[[[NSBundle mainBundle] bundlePath] stringByDeletingLastPathComponent] stringByAppendingString: @"/Library/Application Support/CouchbaseLite"];
    resolve([NSString stringWithFormat:@"%@/%@%@", databaseLocation, dbName, @".cblite"]);
  });
}

RCT_EXPORT_METHOD(databaseAction:(NSArray *)actionList){
  for(NSDictionary *action in actionList){
    NSString *type = [action valueForKey:@"type"];
    if(type){
      if([type isEqualToString:@"read"]){
//        self readDocument:<#(NSString *)#> callback:<#^(NSArray *response)callback#>
        NSLog(@"In the create action!!!");
      }
      else if([type isEqualToString:@"create"]){
        NSLog(@"In the create action!!!");
      }
      else{
        NSLog(@"Action not support: %@", type);
      }
    }
  }
}

// TODO:
// Must seperate three function:
// createView (store the doc and emit temp)
// setKeyForView (by name)
// setValueForView (by name)
RCT_EXPORT_METHOD(createView:(NSString *)name forKey:(NSString *)key resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject){
  dispatch_async(dispatch_get_main_queue(), ^(){
    CBLView *view = [self.database viewNamed: name];
    [view setMapBlock:MAPBLOCK({
      emit(doc[key], doc);
    }) version:@"1"];
    resolve([NSNull null]);
  });
}

RCT_EXPORT_METHOD(query: (NSDictionary *)queryDict resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject){
  dispatch_async(dispatch_get_main_queue(), ^(){
    CBLQuery *query = [[self.database viewNamed: queryDict[@"name"]] createQuery];
    NSLog(@"%@", queryDict);
    query.mapOnly = YES;
    NSString *startKey = [queryDict valueForKey:@"startKey"];
    if(startKey){
      query.startKey = [NSString stringWithString: startKey];
    }
    NSString *endKey = [queryDict valueForKey:@"endKey"];
    if(endKey){
      query.endKey = [NSString stringWithString: endKey];
    }
    int limit = [[queryDict valueForKey:@"limit"] intValue];
    if(limit){
      query.limit = limit;
    }
    NSError *error;
    CBLQueryEnumerator *result = [query run: &error];
    if(error){
      reject(error);
    }
    else{
      NSArray *results = @[];
      for(CBLQueryRow *row in result){
        NSLog(@"%@", [row document].properties);
        results = [results arrayByAddingObject:[row document].properties];
      }
      NSLog(@"%@", results);
      resolve(results);
    }
  });
}

RCT_EXPORT_METHOD(createDocument:(NSDictionary *)properties resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject){
  dispatch_async(dispatch_get_main_queue(), ^(){
    CBLDocument* document = [self.database createDocument];
    NSError* error;
    if (![document putProperties: properties error: &error]) {
      reject(error);
    }
    else{
      resolve(document.properties);
    }
  });
}

RCT_EXPORT_METHOD(readDocument:(NSString *)documentId resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject){
  dispatch_async(dispatch_get_main_queue(), ^(){
    CBLDocument* document = [self.database existingDocumentWithID: documentId];
    if(!document){
      reject([NSError errorWithDomain:[@"Document not exist with id: " stringByAppendingString: documentId] code:-107 userInfo:nil]);
    }
    else{
      resolve(document.properties);
    }
  });
}

@end

