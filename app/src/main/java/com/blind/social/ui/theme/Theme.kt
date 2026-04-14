package com.blind.social.ui.theme

import android.app.Activity
import android.os.Build
import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.material3.dynamicDarkColorScheme
import androidx.compose.material3.dynamicLightColorScheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.runtime.SideEffect
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.toArgb
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.LocalView
import androidx.core.view.WindowCompat

val WhatsAppGreen = Color(0xFF008069)
val WhatsAppGreenDark = Color(0xFF005c4b)
val WhatsAppBackground = Color(0xFFEFEAE2)

private val WhatsAppLightColorScheme = lightColorScheme(
    primary = WhatsAppGreen,
    onPrimary = Color.White,
    secondary = Color(0xFF25D366),
    onSecondary = Color.White,
    background = Color.White,
    onBackground = Color.Black,
    surface = Color.White,
    onSurface = Color.Black,
    error = Color(0xFFEF4444)
)

private val WhatsAppDarkColorScheme = darkColorScheme(
    primary = WhatsAppGreenDark,
    onPrimary = Color.White,
    secondary = Color(0xFF00A884),
    onSecondary = Color.Black,
    background = Color(0xFF111B21),
    onBackground = Color(0xFFE9EDEF),
    surface = Color(0xFF202C33),
    onSurface = Color(0xFFE9EDEF),
    error = Color(0xFFEF4444)
)

@Composable
fun BlindSocialTheme(
    darkTheme: Boolean = isSystemInDarkTheme(),
    dynamicColor: Boolean = false,
    isDesign2: Boolean = false,
    content: @Composable () -> Unit
) {
    val colorScheme = if (darkTheme) WhatsAppDarkColorScheme else WhatsAppLightColorScheme

    val view = LocalView.current
    if (!view.isInEditMode) {
        SideEffect {
            val window = (view.context as Activity).window
            window.statusBarColor = colorScheme.primary.toArgb()
            WindowCompat.getInsetsController(window, view).isAppearanceLightStatusBars = false
        }
    }

    MaterialTheme(
        colorScheme = colorScheme,
        typography = Typography,
        content = content
    )
}
