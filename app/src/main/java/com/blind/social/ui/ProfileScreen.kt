package com.blind.social.ui

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

@Composable
fun ProfileScreen() {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(Color(0xFFF0F2F5))
            .verticalScroll(rememberScrollState())
    ) {
        // Profile Header
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .background(Color.White)
                .clickable { }
                .padding(16.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Box(
                modifier = Modifier
                    .size(64.dp)
                    .clip(CircleShape)
                    .background(Color.LightGray),
                contentAlignment = Alignment.Center
            ) {
                Icon(Icons.Default.Person, contentDescription = null, tint = Color.Gray, modifier = Modifier.size(40.dp))
            }
            Spacer(modifier = Modifier.width(16.dp))
            Column(modifier = Modifier.weight(1f)) {
                Text("Kullanıcı Adı", fontSize = 20.sp, fontWeight = FontWeight.Medium, color = Color.Black)
                Text("Durum bilgisi burada yer alır", fontSize = 14.sp, color = Color.Gray)
            }
            Icon(Icons.Default.QrCode, contentDescription = "QR Kodu", tint = WhatsAppGreen)
        }

        Spacer(modifier = Modifier.height(12.dp))

        // Settings Items
        SettingsSection {
            SettingsItem(icon = Icons.Default.Key, title = "Hesap", subtitle = "Güvenlik bildirimleri, numara değiştirme")
            SettingsItem(icon = Icons.Default.Lock, title = "Gizlilik", subtitle = "Kişileri engelleme, süreli mesajlar")
            SettingsItem(icon = Icons.Default.Face, title = "Avatar", subtitle = "Oluştur, düzenle, profil fotoğrafı yap")
            SettingsItem(icon = Icons.Default.Message, title = "Sohbetler", subtitle = "Tema, duvar kağıtları, sohbet geçmişi")
            SettingsItem(icon = Icons.Default.Notifications, title = "Bildirimler", subtitle = "Mesaj, grup ve arama sesleri")
            SettingsItem(icon = Icons.Default.DataUsage, title = "Depolama ve veriler", subtitle = "Ağ kullanımı, otomatik indirme")
            SettingsItem(icon = Icons.Default.Language, title = "Uygulama dili", subtitle = "Türkçe (cihazın dili)")
            SettingsItem(icon = Icons.Default.Help, title = "Yardım", subtitle = "Yardım merkezi, bize ulaşın, gizlilik ilkesi")
            SettingsItem(icon = Icons.Default.Group, title = "Arkadaş davet et", subtitle = "")
        }

        Spacer(modifier = Modifier.height(32.dp))
        
        Column(
            modifier = Modifier.fillMaxWidth(),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Text("from", fontSize = 12.sp, color = Color.Gray)
            Text("Meta", fontSize = 16.sp, fontWeight = FontWeight.Bold, color = Color.Black)
            Spacer(modifier = Modifier.height(32.dp))
        }
    }
}

@Composable
fun SettingsSection(content: @Composable () -> Unit) {
    Column(modifier = Modifier.fillMaxWidth().background(Color.White)) {
        content()
    }
}

@Composable
fun SettingsItem(icon: ImageVector, title: String, subtitle: String) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .clickable { }
            .padding(horizontal = 16.dp, vertical = 16.dp),
        verticalAlignment = Alignment.CenterVertically
    ) {
        Icon(icon, contentDescription = null, tint = Color.Gray, modifier = Modifier.size(24.dp))
        Spacer(modifier = Modifier.width(24.dp))
        Column {
            Text(title, fontSize = 16.sp, color = Color.Black)
            if (subtitle.isNotEmpty()) {
                Text(subtitle, fontSize = 14.sp, color = Color.Gray)
            }
        }
    }
}