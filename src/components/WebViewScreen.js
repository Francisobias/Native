// src/components/WebViewScreen.js
import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { WebView } from "react-native-webview";
import { WEBVIEW_URL } from "../constants";
import Loader from "./Loader";

const WebViewScreen = forwardRef((props, ref) => {
  const webViewRef = useRef(null);
  const [loading, setLoading] = React.useState(true);

  // I-expose yung goBack() para ma-call from App.js
  useImperativeHandle(ref, () => ({
    goBack: () => {
      webViewRef.current?.goBack();
    },
  }));

  return (
    <>
      {loading && <Loader />}
      <WebView
        ref={webViewRef}
        source={{ uri: WEBVIEW_URL }}
        onLoadEnd={() => setLoading(false)}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        mixedContentMode="always"
        originWhitelist={["*"]}
        allowsFullscreenVideo={true}
        allowsInlineMediaPlayback={true}
        mediaPlaybackRequiresUserAction={false}
        setSupportMultipleWindows={false}
        style={{ flex: 1 }}
      />
    </>
  );
});

export default WebViewScreen;