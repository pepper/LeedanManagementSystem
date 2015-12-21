package com.tablet;

import android.util.Log;

import com.couchbase.lite.CouchbaseLiteException;
import com.couchbase.lite.Database;
import com.couchbase.lite.Document;
import com.couchbase.lite.Emitter;
import com.couchbase.lite.Manager;
import com.couchbase.lite.Mapper;
import com.couchbase.lite.Query;
import com.couchbase.lite.QueryEnumerator;
import com.couchbase.lite.QueryRow;
import com.couchbase.lite.View;
import com.couchbase.lite.android.AndroidContext;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableMapKeySetIterator;
import com.facebook.react.bridge.ReadableType;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class CouchbaseLite extends ReactContextBaseJavaModule {
    private static final String TAG = "CouchbaseLite";
    private ReactApplicationContext context;
    private Manager manager;
    private Database database;

    public CouchbaseLite(ReactApplicationContext reactContext) {
        super(reactContext);
        this.context = reactContext;
    }

    @ReactMethod
    public void connectToCouchbaseLite(Promise promise){
        try {
            this.manager = new Manager(new AndroidContext(this.context), Manager.DEFAULT_OPTIONS);
            String message = "Manager created";
            Log.d(TAG, message);
            promise.resolve(message);
        }
        catch(Exception e){
            String errorMessage = "Cannot create shared instance of CBLManager";
            Log.e(TAG, errorMessage, e);
            promise.reject(errorMessage + ": " + e.getMessage());
        }
    }

    @ReactMethod
    public void createDatabase(String dbName, Promise promise){
        if(!Manager.isValidDatabaseName(dbName)){
            promise.reject("Bad database name");
            return;
        }
        try {
            this.database = this.manager.getDatabase(dbName);
            Log.d(TAG, "Create success:" + this.database.getPath());
            promise.resolve(this.database.getPath());
        }
        catch (CouchbaseLiteException e) {
            String errorMessage = "Cannot create database. Error message:" + e.toString();
            Log.e(TAG, errorMessage, e);
            promise.reject(errorMessage);
        }
    }

    @ReactMethod
    public void createView(String name, final String key, Promise promise){
        View view = database.getView(name);
        view.setMap(new Mapper() {
            @Override
            public void map(Map<String, Object> document, Emitter emitter) {
                emitter.emit((String) document.get(key), document);
            }
        }, "1");
        promise.resolve("");
    }

    @ReactMethod
    public void createDocument(ReadableMap properties, Promise promise){
        Document document = this.database.createDocument();
        try {
            document.putProperties(CouchbaseLite.toMap(properties));
            promise.resolve(document.getProperties());
        }
        catch (CouchbaseLiteException e) {
            String errorMessage = "Cannot create document. Error message: " + e.getMessage();
            Log.e(TAG, errorMessage);
            promise.reject(errorMessage);
        }
    }

    @ReactMethod
    public void query(ReadableMap queryMap, Promise promise){
        Query query = this.database.getView(queryMap.getString("name")).createQuery();
        query.setMapOnly(true);
        String startKey = queryMap.getString("startKey");
        if(startKey != ""){
            query.setStartKey(startKey);
        }
        String endKey = queryMap.getString("endKey");
        if(endKey != ""){
            query.setEndKey(endKey);
        }
        int limit = queryMap.getInt("limit");
        if(limit > 0){
            query.setLimit(limit);
        }
        try {
            QueryEnumerator result = query.run();
            WritableArray results = Arguments.createArray();
            for(QueryRow row : result){
                Log.d(TAG, row.getDocument().getProperties().toString());
                results.pushMap(CouchbaseLite.toWritableMap(row.getDocument().getProperties()));
            }
            promise.resolve(results);
        }
        catch (CouchbaseLiteException e) {
            String errorMessage = "Cannot query. Error message: " + e.getMessage();
            Log.e(TAG, errorMessage);
            promise.reject(errorMessage);
        }
    }

    @Override
    public String getName() {
        return "CouchbaseLite";
    }

    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        return constants;
    }

    private static List<Object> toArray(ReadableArray readableArray) {
        List<Object> unwrappedList = new ArrayList<>(readableArray.size());
        for (int i = 0; i < readableArray.size(); i++) {
            ReadableType type = readableArray.getType(i);
            switch (type) {
                case Null:
                    unwrappedList.add(i, null);
                    break;
                case Boolean:
                    unwrappedList.add(i, readableArray.getBoolean(i));
                    break;
                case Number:
                    unwrappedList.add(i, readableArray.getDouble(i));
                    break;
                case String:
                    unwrappedList.add(i, readableArray.getString(i));
                    break;
                case Map:
                    unwrappedList.add(i, CouchbaseLite.toMap(readableArray.getMap(i)));
                    break;
                case Array:
                    unwrappedList.add(i, CouchbaseLite.toArray(readableArray.getArray(i)));
                    break;
                default:
                    throw new IllegalArgumentException("Could not convert object at index " + i + ".");
            }
        }
        return unwrappedList;
    }

    private static Map<String, Object> toMap(ReadableMap map) {
        ReadableMapKeySetIterator iterator = map.keySetIterator();
        Map<String, Object> unwrappedMap = new HashMap<>();
        while (iterator.hasNextKey()) {
            String key = iterator.nextKey();
            ReadableType type = map.getType(key);
            switch (type) {
                case Null:
                    unwrappedMap.put(key, null);
                    break;
                case Boolean:
                    unwrappedMap.put(key, map.getBoolean(key));
                    break;
                case Number:
                    unwrappedMap.put(key, map.getDouble(key));
                    break;
                case String:
                    unwrappedMap.put(key, map.getString(key));
                    break;
                case Map:
                    unwrappedMap.put(key, CouchbaseLite.toMap(map.getMap(key)));
                    break;
                case Array:
                    unwrappedMap.put(key, CouchbaseLite.toArray(map.getArray(key)));
                    break;
                default:
                    throw new IllegalArgumentException("Could not convert object with key: " + key + ".");
            }
        }
        return unwrappedMap;
    }

    private static WritableArray toWritableArray(List<Object> array){
        WritableArray writableArray = Arguments.createArray();
        for (Object item : array){
            if(item instanceof Boolean){
                writableArray.pushBoolean((Boolean) item);
            }
            else if(item instanceof Integer){
                writableArray.pushInt((Integer) item);
            }
            else if(item instanceof Double){
                writableArray.pushDouble((Double) item);
            }
            else if(item instanceof String){
                writableArray.pushString((String) item);
            }
            else if(item instanceof Map){
                writableArray.pushMap(CouchbaseLite.toWritableMap((Map<String, Object>)item));
            }
            else if(item instanceof List){
                writableArray.pushArray(CouchbaseLite.toWritableArray((List<Object>)item));
            }
            else{
                writableArray.pushNull();
            }
        }
        return writableArray;
    }

    private static WritableMap toWritableMap(Map<String, Object> map) {
        WritableMap writableMap = Arguments.createMap();
        for (Map.Entry<String, Object> entry : map.entrySet()) {
            String key = entry.getKey();
            Object value = entry.getValue();
            if(value instanceof Boolean){
                writableMap.putBoolean(key, (Boolean) value);
            }
            else if(value instanceof Integer){
                writableMap.putInt(key, (Integer) value);
            }
            else if(value instanceof Double){
                writableMap.putDouble(key, (Double) value);
            }
            else if(value instanceof String){
                writableMap.putString(key, (String) value);
            }
            else if(value instanceof Map){
                writableMap.putMap(key, CouchbaseLite.toWritableMap((Map<String, Object>)value));
            }
            else if(value instanceof List){
                writableMap.putArray(key, CouchbaseLite.toWritableArray((List<Object>)value));
            }
            else{
                writableMap.putNull(key);
            }
        }
        return writableMap;
    }
}