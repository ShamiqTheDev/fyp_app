package com.fyp_app;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.Service;
import android.content.Intent;
import android.location.Location;
import android.os.Build;
import android.os.IBinder;
import android.util.Log;

import androidx.annotation.Nullable;
import androidx.core.app.NotificationCompat;

import com.google.android.gms.location.FusedLocationProviderClient;
import com.google.android.gms.location.LocationCallback;
import com.google.android.gms.location.LocationRequest;
import com.google.android.gms.location.LocationResult;
import com.google.android.gms.location.LocationServices;

public class BackgroundLocationService extends Service {
  private static final String TAG = "BackgroundLocationService";
  private static final String CHANNEL_ID = "BackgroundLocationChannel";
  private static final int NOTIFICATION_ID = 1;

  private FusedLocationProviderClient fusedLocationClient;
  private LocationCallback locationCallback;

  @Override
  public void onCreate() {
    super.onCreate();

    fusedLocationClient = LocationServices.getFusedLocationProviderClient(this);

    locationCallback = new LocationCallback() {
      @Override
      public void onLocationResult(LocationResult locationResult) {
        if (locationResult == null) {
          return;
        }
        for (Location location : locationResult.getLocations()) {
          sendLocationUpdate(location);
        }
      }
    };

    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
      NotificationChannel channel = new NotificationChannel(
        CHANNEL_ID,
        "Background Location Channel",
        NotificationManager.IMPORTANCE_LOW
      );
      NotificationManager notificationManager = getSystemService(NotificationManager.class);
      notificationManager.createNotificationChannel(channel);
    }
  }

  @Override
  public int onStartCommand(Intent intent, int flags, int startId) {
    startForeground(NOTIFICATION_ID, createNotification());

    LocationRequest locationRequest = new LocationRequest();
    locationRequest.setInterval(10000); // 10 seconds
    locationRequest.setFastestInterval(5000); // 5 seconds
    locationRequest.setPriority(LocationRequest.PRIORITY_HIGH_ACCURACY);

    fusedLocationClient.requestLocationUpdates(locationRequest, locationCallback, null);

    return START_STICKY;
  }

  @Override
  public void onDestroy() {
    fusedLocationClient.removeLocationUpdates(locationCallback);
    super.onDestroy();
  }

  @Nullable
  @Override
  public IBinder onBind(Intent intent) {
    return null;
  }

  private Notification createNotification() {
    NotificationCompat.Builder builder = new NotificationCompat.Builder(this, CHANNEL_ID)
      .setContentTitle("Background Location Tracking")
      .setContentText("Tracking your location in the background")
      .setSmallIcon(R.mipmap.ic_launcher)
      .setPriority(NotificationCompat.PRIORITY_LOW);

    return builder.build();
  }

  private void sendLocationUpdate(Location location) {
    WritableMap params = Arguments.createMap();
    params.putDouble("latitude", location.getLatitude());
    params.putDouble("longitude", location.getLongitude());

    ReactApplicationContext reactContext = (ReactApplicationContext) getApplicationContext();
    reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
      .emit("locationUpdate", params);
  }
}
