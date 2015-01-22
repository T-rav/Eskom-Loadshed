/*
    Copyright 2013-2014 appPlant UG

    Licensed to the Apache Software Foundation (ASF) under one
    or more contributor license agreements.  See the NOTICE file
    distributed with this work for additional information
    regarding copyright ownership.  The ASF licenses this file
    to you under the Apache License, Version 2.0 (the
    "License"); you may not use this file except in compliance
    with the License.  You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing,
    software distributed under the License is distributed on an
    "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, either express or implied.  See the License for the
    specific language governing permissions and limitations
    under the License.
*/

package de.appplant.cordova.plugin.localnotification;

import java.util.Calendar;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;

import android.support.v4.app.NotificationCompat.Builder;

import de.appplant.cordova.plugin.notification.*;

/**
 * The alarm receiver is triggered when a scheduled alarm is fired. This class
 * reads the information in the intent and displays this information in the
 * Android notification bar. The notification uses the default notification
 * sound and it vibrates the phone.
 */
public class Receiver extends BroadcastReceiver {

    public static final String OPTIONS = "LOCAL_NOTIFICATION_OPTIONS";
	public static int prevValue = 0;
	public static String url = "http://stoneagetechnologies.com/eskomloadshed/status2/?jsoncallback=?";

    private Options options;

    @Override
    public void onReceive (Context context, Intent intent) {
    	NotificationWrapper nWrapper = new NotificationWrapper(context, Receiver.class,LocalNotification.PLUGIN_NAME,OPTIONS);
        Options options = null;
        Bundle bundle   = intent.getExtras();
        JSONObject args;

        try {
            args    = new JSONObject(bundle.getString(OPTIONS));
            options = new Options(context).parse(args);
        } catch (JSONException e) {
            return;
        }
        this.options = options;
        
    	NotificationBuilder builder = new NotificationBuilder(options,context,OPTIONS,
    			DeleteIntentReceiver.class,ReceiverActivity.class);

        // The context may got lost if the app was not running before
        LocalNotification.setContext(context);
		
		// * NEW : TRAV ADDED
		AsyncHttpClient client = new AsyncHttpClient();
		 RequestParams params = new RequestParams();
         client.get(urlString,params,new AsyncHttpResponseHandler() {
             // When the response returned by REST has Http response code '200'
             @Override
             public void onSuccess(String response) {
                 try {
                          // JSON Object
                         JSONObject obj = new JSONObject(response);
						 int currentLevel = obj.getInt("level");
						 boolean changeInLevel = false;
						 
						 // Check message ;)
						 if(currentLevel != prevLevel){
							changeInLevel = true;
							prevValue = currentLevel; 
							
							if(currentLevel === 0){
								message = "No load shedding.";
							}else if(currentLevel === 1){
								message = "Stage 1 load shedding.";
							}else if(currentLevel === 2){
								message = "Stage 2 load shedding.";
							}else if(currentLevel === 3){
								message = "Stage 3 load shedding.";
							}else{
								message = "Unknown status?!";
							}
							
							sendNotifiation(nWrapper, message);
						 }	 
                 } catch (JSONException e) {
                 }
             }
             // When the response returned by REST has Http response code other than '200'
             @Override
             public void onFailure(int statusCode, Throwable error, String content) {
				// Do nothing for now ;)
             }
         });
		
        fireTriggerEvent();
		
		
    }
	
	// 	 * NEW : TRAV ADDED
	private String sendNotifiation(NotificationWrapper nWrapper, String message){
        if (options.getInterval() == 0) {
        } else if (isFirstAlarmInFuture()) {
            return;
        } else {
        	JSONArray data = new JSONArray().put(options.getJSONObject());
        	LocalNotification.fireEvent("updateCall", options.getId(), options.getJSON(),data);
            nWrapper.schedule(options.moveDate());
        }
        if (!LocalNotification.isInBackground && options.getForegroundMode()){
        	if (options.getInterval() == 0) {
        		LocalNotification.unpersist(options.getId());
        	}
			
			nWrapper.showNotificationToast(options, message);
			fireTriggerEvent();
        } else {
			Builder notification = builder.buildNotification(message);

			nWrapper.showNotification(notification, options);
        }
	}

    /*
     * If you set a repeating alarm at 11:00 in the morning and it
     * should trigger every morning at 08:00 o'clock, it will
     * immediately fire. E.g. Android tries to make up for the
     * 'forgotten' reminder for that day. Therefore we ignore the event
     * if Android tries to 'catch up'.
     */
    private Boolean isFirstAlarmInFuture () {
        if (options.getInterval() > 0) {
            Calendar now    = Calendar.getInstance();
            Calendar alarm  = options.getCalendar();

            int alarmHour   = alarm.get(Calendar.HOUR_OF_DAY);
            int alarmMin    = alarm.get(Calendar.MINUTE);
            int currentHour = now.get(Calendar.HOUR_OF_DAY);
            int currentMin  = now.get(Calendar.MINUTE);

            if (currentHour != alarmHour && currentMin != alarmMin) {
                return true;
            }
        }

        return false;
    }

    /**
     * Fires ontrigger event.
     */
    private void fireTriggerEvent () {
    	JSONArray data = new JSONArray().put(options.getJSONObject());
        LocalNotification.fireEvent("trigger", options.getId(), options.getJSON(),data);
    }
}
