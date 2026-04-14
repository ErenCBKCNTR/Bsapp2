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
import androidx.compose.ui.graphics.toArgb
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.LocalView
import androidx.core.view.WindowCompat

private val DarkColorScheme = darkColorScheme(
    primary = Purple80,
    secondary = PurpleGrey80,
    tertiary = Pink80
)

private val LightColorScheme = lightColorScheme(
    primary = Purple40,
    secondary = PurpleGrey40,
    tertiary = Pink40
)

private val Design2ColorScheme = darkColorScheme(
    primary = D2Primary,
    onPrimary = D2OnPrimary,
    secondary = D2Secondary,
    onSecondary = D2Background,
    background = D2Background,
    onBackground = D2OnBackground,
    surface = D2Surface,
    onSurface = D2OnBackground,
    error = D2Error
)

private val Design2LightColorScheme = lightColorScheme(
    primary = D2LightPrimary,
    onPrimary = D2LightOnPrimary,
    secondary = D2LightSecondary,
    onSecondary = D2LightBackground,
    background = D2LightBackground,
    onBackground = D2LightOnBackground,
    surface = D2LightSurface,
    onSurface = D2LightOnBackground,
    error = D2LightError
)

private val Design3ColorScheme = darkColorScheme(
    primary = Yellow400,
    onPrimary = Zinc950,
    secondary = Zinc800,
    onSecondary = Zinc50,
    background = Zinc950,
    onBackground = Zinc50,
    surface = Zinc900,
    onSurface = Zinc50,
    error = Color(0xFFEF4444)
)

@Composable
fun BlindSocialTheme(
    darkTheme: Boolean = isSystemInDarkTheme(),
    dynamicColor: Boolean = false, // Disable dynamic color to force Design 3
    isDesign2: Boolean = false, // We are using Design 3 now
    content: @Composable () -> Unit
) {
    val colorScheme = Design3ColorScheme // Force Design 3 for both light and dark for now to match the prototype

    val view = LocalView.current
    if (!view.isInEditMode) {
        SideEffect {
            val window = (view.context as Activity).window
            window.statusBarColor = colorScheme.background.toArgb()
            WindowCompat.getInsetsController(window, view).isAppearanceLightStatusBars = false
        }
    }

    MaterialTheme(
        colorScheme = colorScheme,
        typography = Typography,
        content = content
    )
}
