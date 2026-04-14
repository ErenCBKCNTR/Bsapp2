package com.blind.social.ui

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.MoreVert
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import kotlinx.coroutines.delay
import com.blind.social.ui.theme.WhatsAppGreen

@Composable
fun HomeScreen() {
    var viewingStatus by remember { mutableStateOf(false) }
    var progress by remember { mutableStateOf(0f) }

    LaunchedEffect(viewingStatus) {
        if (viewingStatus) {
            progress = 0f
            while (progress < 1f) {
                delay(50)
                progress += 0.015f
            }
            viewingStatus = false
        }
    }

    if (viewingStatus) {
        Box(modifier = Modifier.fillMaxSize().background(Color.Black)) {
            Column(modifier = Modifier.fillMaxSize()) {
                LinearProgressIndicator(
                    progress = { progress },
                    modifier = Modifier.fillMaxWidth().padding(horizontal = 8.dp, vertical = 16.dp),
                    color = Color.White,
                    trackColor = Color.Gray
                )
                Row(
                    modifier = Modifier.fillMaxWidth().padding(horizontal = 16.dp),
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.SpaceBetween
                ) {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Box(modifier = Modifier.size(40.dp).clip(CircleShape).background(Color.LightGray))
                        Spacer(modifier = Modifier.width(12.dp))
                        Column {
                            Text("Durumum", color = Color.White, fontWeight = FontWeight.Medium)
                            Text("Şimdi", color = Color.LightGray, fontSize = 12.sp)
                        }
                    }
                    IconButton(onClick = { viewingStatus = false }) {
                        Icon(Icons.Default.Add, contentDescription = "Kapat", tint = Color.White) // Should be Close icon
                    }
                }
                Box(modifier = Modifier.fillMaxSize().background(Color(0xFF9C27B0)), contentAlignment = Alignment.Center) {
                    Text("Bugün harika bir gün! \uD83C\uDF1F", color = Color.White, fontSize = 24.sp, fontWeight = FontWeight.Medium)
                }
            }
        }
        return
    }

    Column(modifier = Modifier.fillMaxSize().background(Color.White)) {
        Row(
            modifier = Modifier.fillMaxWidth().padding(horizontal = 16.dp, vertical = 12.dp),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Text("Durum", fontSize = 20.sp, fontWeight = FontWeight.Medium, color = Color.Black)
            Icon(Icons.Default.MoreVert, contentDescription = "Diğer seçenekler", tint = Color.Gray)
        }

        Row(
            modifier = Modifier
                .fillMaxWidth()
                .clickable { viewingStatus = true }
                .padding(horizontal = 16.dp, vertical = 8.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Box(contentAlignment = Alignment.BottomEnd) {
                Box(
                    modifier = Modifier
                        .size(56.dp)
                        .clip(CircleShape)
                        .background(Color.LightGray)
                )
                Box(
                    modifier = Modifier
                        .size(20.dp)
                        .clip(CircleShape)
                        .background(WhatsAppGreen),
                    contentAlignment = Alignment.Center
                ) {
                    Icon(Icons.Default.Add, contentDescription = "Ekle", tint = Color.White, modifier = Modifier.size(16.dp))
                }
            }
            Spacer(modifier = Modifier.width(16.dp))
            Column(modifier = Modifier.weight(1f)) {
                Text("Durumum", fontSize = 16.sp, fontWeight = FontWeight.Medium, color = Color.Black)
                Text("Şimdi eklendi", fontSize = 14.sp, color = Color.Gray)
            }
        }

        Text(
            "Son güncellemeler",
            fontSize = 14.sp,
            fontWeight = FontWeight.Medium,
            color = Color.Gray,
            modifier = Modifier.padding(horizontal = 16.dp, vertical = 8.dp)
        )

        Column(
            modifier = Modifier.fillMaxWidth().padding(vertical = 32.dp),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Box(
                modifier = Modifier.size(64.dp).clip(CircleShape).background(Color(0xFFF5F5F5)),
                contentAlignment = Alignment.Center
            ) {
                Icon(Icons.Default.Add, contentDescription = "Ekle", tint = Color.Gray, modifier = Modifier.size(32.dp))
            }
            Spacer(modifier = Modifier.height(12.dp))
            Text("Şu an için yeni güncelleme yok", color = Color.Gray)
        }
    }
}