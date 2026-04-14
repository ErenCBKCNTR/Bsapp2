package com.blind.social.ui

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.Group
import androidx.compose.material.icons.filled.PlayArrow
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.semantics.contentDescription
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp

@Composable
fun HomeScreen() {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(MaterialTheme.colorScheme.background)
            .padding(24.dp),
        horizontalAlignment = Alignment.Start,
        verticalArrangement = Arrangement.Top
    ) {
        Spacer(modifier = Modifier.height(16.dp))
        
        Text(
            text = "Hoş Geldiniz!",
            style = MaterialTheme.typography.headlineLarge.copy(fontWeight = FontWeight.Bold),
            color = MaterialTheme.colorScheme.onBackground
        )
        
        Spacer(modifier = Modifier.height(8.dp))
        
        val welcomeText = "Blind Social'a hoş geldiniz. Bu uygulama erişilebilir ve güvenli bir şekilde iletişim kurmanız için tasarlanmıştır."
        Text(
            text = welcomeText,
            style = MaterialTheme.typography.bodyLarge,
            color = MaterialTheme.colorScheme.onBackground.copy(alpha = 0.7f),
            modifier = Modifier.semantics { contentDescription = welcomeText }
        )
        
        Spacer(modifier = Modifier.height(32.dp))
        
        Text(
            text = "Hızlı İşlemler",
            style = MaterialTheme.typography.titleLarge.copy(fontWeight = FontWeight.SemiBold),
            color = MaterialTheme.colorScheme.onBackground.copy(alpha = 0.9f)
        )
        
        Spacer(modifier = Modifier.height(16.dp))
        
        // Oda Oluştur Button
        HomeActionButton(
            title = "Oda Oluştur",
            subtitle = "Yeni bir sohbet başlat",
            icon = Icons.Default.Add,
            containerColor = MaterialTheme.colorScheme.primary,
            contentColor = MaterialTheme.colorScheme.onPrimary,
            iconBgColor = MaterialTheme.colorScheme.onPrimary.copy(alpha = 0.1f),
            onClick = { /* TODO */ }
        )
        
        Spacer(modifier = Modifier.height(16.dp))
        
        // Odalara Katıl Button
        HomeActionButton(
            title = "Odalara Katıl",
            subtitle = "Aktif sohbetleri keşfet",
            icon = Icons.Default.PlayArrow,
            containerColor = MaterialTheme.colorScheme.secondary,
            contentColor = MaterialTheme.colorScheme.onSecondary,
            iconBgColor = MaterialTheme.colorScheme.background,
            iconColor = MaterialTheme.colorScheme.primary,
            onClick = { /* TODO */ }
        )
        
        Spacer(modifier = Modifier.height(16.dp))
        
        // Arkadaş Bul Button
        HomeActionButton(
            title = "Arkadaş Bul",
            subtitle = "Yeni insanlarla tanış",
            icon = Icons.Default.Group,
            containerColor = MaterialTheme.colorScheme.secondary,
            contentColor = MaterialTheme.colorScheme.onSecondary,
            iconBgColor = MaterialTheme.colorScheme.background,
            iconColor = MaterialTheme.colorScheme.primary,
            onClick = { /* TODO */ }
        )
    }
}

@Composable
fun HomeActionButton(
    title: String,
    subtitle: String,
    icon: ImageVector,
    containerColor: Color,
    contentColor: Color,
    iconBgColor: Color,
    iconColor: Color = contentColor,
    onClick: () -> Unit
) {
    Button(
        onClick = onClick,
        colors = ButtonDefaults.buttonColors(
            containerColor = containerColor,
            contentColor = contentColor
        ),
        shape = RoundedCornerShape(24.dp),
        contentPadding = PaddingValues(20.dp),
        modifier = Modifier
            .fillMaxWidth()
            .semantics { contentDescription = "$title, $subtitle" }
    ) {
        Row(
            verticalAlignment = Alignment.CenterVertically,
            modifier = Modifier.fillMaxWidth()
        ) {
            Box(
                modifier = Modifier
                    .size(56.dp)
                    .background(iconBgColor, RoundedCornerShape(28.dp)),
                contentAlignment = Alignment.Center
            ) {
                Icon(
                    imageVector = icon,
                    contentDescription = null,
                    tint = iconColor,
                    modifier = Modifier.size(32.dp)
                )
            }
            
            Spacer(modifier = Modifier.width(16.dp))
            
            Column {
                Text(
                    text = title,
                    style = MaterialTheme.typography.titleLarge.copy(fontWeight = FontWeight.Bold)
                )
                Text(
                    text = subtitle,
                    style = MaterialTheme.typography.bodyMedium,
                    color = contentColor.copy(alpha = 0.8f)
                )
            }
        }
    }
}