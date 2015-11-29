//
//  CouchbaseLite.h
//  Tablet
//
//  Created by YenPepper on 2015/11/29.
//  Copyright © 2015年 Facebook. All rights reserved.
//

#import "RCTBridgeModule.h"

#import "CouchbaseLite/CouchbaseLite.h"
#import "CouchbaseLite/CBLDocument.h"

@interface CouchbaseLite : NSObject <RCTBridgeModule>

// shared manager
@property (strong, nonatomic) CBLManager *manager;
// the database
@property (strong, nonatomic) CBLDatabase *database;

@end
