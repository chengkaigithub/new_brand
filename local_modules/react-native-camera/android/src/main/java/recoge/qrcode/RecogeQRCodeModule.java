package recoge.qrcode;

import android.content.ContentResolver;
import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.net.Uri;
import android.text.TextUtils;
import android.util.Log;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.google.zxing.BinaryBitmap;
import com.google.zxing.DecodeHintType;
import com.google.zxing.LuminanceSource;
import com.google.zxing.MultiFormatReader;
import com.google.zxing.PlanarYUVLuminanceSource;
import com.google.zxing.Result;
import com.google.zxing.common.HybridBinarizer;

import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.util.Hashtable;


/**
 * Created by chengkai on 2019/6/29.
 */

public class RecogeQRCodeModule extends ReactContextBaseJavaModule {

    private Promise phoneContactsPromise = null;

    public RecogeQRCodeModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "RecogeQRCodeManager";
    }


    @ReactMethod
    public void recogeQRcode(String path, Promise promise) {
        try {
            if (path.startsWith("file://")) {
                path = path.substring(7);
            }
            Bitmap scanBitmap = getBitmapFromPath(path);
            String result = scanImageBitmap(scanBitmap);
            promise.resolve(result);
        } catch (Exception e) {
            promise.resolve("");
//            promise.reject("ERROR", e.getMessage());
        }
    }

    /**
     * 从路径中获取Bitmap
     *
     * @param imagePath 图片在SDCard中的路径
     * @return
     */
    public static Bitmap getBitmapFromPath(String imagePath) {
        BitmapFactory.Options opt = new BitmapFactory.Options();
        opt.inPreferredConfig = Bitmap.Config.RGB_565;
        opt.inPurgeable = true;
        opt.inInputShareable = true;
        //获取资源图片
        return BitmapFactory.decodeFile(imagePath, opt);
    }

    /**
     * 扫描 二维码 bitmap
     *
     * @param scanBitmap
     * @return
     */
    public static String scanImageBitmap(Bitmap scanBitmap) {
        // DecodeHintType 和EncodeHintType
        Hashtable<DecodeHintType, String> hints = new Hashtable<DecodeHintType, String>();
        hints.put(DecodeHintType.CHARACTER_SET, "utf-8"); // 设置二维码内容的编码

        LuminanceSource source = new PlanarYUVLuminanceSource(
                rgb2YUV(scanBitmap), scanBitmap.getWidth(),
                scanBitmap.getHeight(), 0, 0, scanBitmap.getWidth(),
                scanBitmap.getHeight(), false);
        BinaryBitmap binaryBitmap = new BinaryBitmap(new HybridBinarizer(source));
        MultiFormatReader reader = new MultiFormatReader();
        Result result;
        try {
            result = reader.decode(binaryBitmap, hints);
            String content = result.getText();
            recycleBitmap(scanBitmap);
            return TextUtils.isEmpty(content) ? "" : content;
        } catch (Exception e1) {
            e1.printStackTrace();
            return "";
        }
    }

    public static byte[] rgb2YUV(Bitmap bitmap) {
        int width = bitmap.getWidth();
        int height = bitmap.getHeight();
        int[] pixels = new int[width * height];
        bitmap.getPixels(pixels, 0, width, 0, 0, width, height);

        int len = width * height;
        byte[] yuv = new byte[len * 3 / 2];
        int y, u, v;
        for (int i = 0; i < height; i++) {
            for (int j = 0; j < width; j++) {
                int rgb = pixels[i * width + j] & 0x00FFFFFF;

                int r = rgb & 0xFF;
                int g = (rgb >> 8) & 0xFF;
                int b = (rgb >> 16) & 0xFF;

                y = ((66 * r + 129 * g + 25 * b + 128) >> 8) + 16;
                u = ((-38 * r - 74 * g + 112 * b + 128) >> 8) + 128;
                v = ((112 * r - 94 * g - 18 * b + 128) >> 8) + 128;

                y = y < 16 ? 16 : (y > 255 ? 255 : y);
                u = u < 0 ? 0 : (u > 255 ? 255 : u);
                v = v < 0 ? 0 : (v > 255 ? 255 : v);

                yuv[i * width + j] = (byte) y;
//				yuv[len + (i >> 1) * width + (j & ~1) + 0] = (byte) u;
//				yuv[len + (i >> 1) * width + (j & ~1) + 1] = (byte) v;
            }
        }
        return yuv;
    }


    /**
     * 回收不用的Bitmap
     *
     * @param bitmap
     */
    public static void recycleBitmap(Bitmap bitmap) {
        if (bitmap != null) {
            if (!bitmap.isRecycled()) {
                bitmap.recycle();
                bitmap = null;
            }
        }
    }

}
