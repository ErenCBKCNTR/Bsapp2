package com.blind.social.ui

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Archive
import androidx.compose.material.icons.filled.Message
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.blind.social.ui.theme.WhatsAppGreen

data class MockMessage(val id: Int, val name: String, val lastMessage: String, val time: String, val unread: Int)

val mockMessages = listOf(
    MockMessage(1, "Ahmet Yılmaz", "Merhaba, nasılsın?", "10:42", 2),
    MockMessage(2, "Ayşe Kaya", "Odadaki tartışma çok iyiydi.", "Dün", 0),
    MockMessage(3, "Mehmet Demir", "Yarın görüşürüz.", "Salı", 0)
)

@Composable
fun MessagesScreen(onNavigateToChat: (String, String, String?) -> Unit) {
    Box(modifier = Modifier.fillMaxSize().background(Color.White)) {
        Column(modifier = Modifier.fillMaxSize()) {
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .clickable { /* TODO: Arşivlenmiş sohbetler ekranı */ }
                    .padding(horizontal = 16.dp, vertical = 12.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                Icon(Icons.Default.Archive, contentDescription = "Arşivlenmiş", tint = Color.Gray, modifier = Modifier.padding(start = 8.dp))
                Spacer(modifier = Modifier.width(24.dp))
                Text("Arşivlenmiş", fontSize = 16.sp, fontWeight = FontWeight.Medium, color = Color.Black)
            }

            LazyColumn(modifier = Modifier.fillMaxSize()) {
                items(mockMessages) { msg ->
                    Row(
                        modifier = Modifier
                            .fillMaxWidth()
                            .clickable { 
                                onNavigateToChat(msg.id.toString(), msg.name, null)
                            }
                            .padding(horizontal = 16.dp, vertical = 12.dp),
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Box(
                            modifier = Modifier
                                .size(48.dp)
                                .clip(CircleShape)
                                .background(Color.LightGray)
                        )
                        Spacer(modifier = Modifier.width(16.dp))
                        Column(modifier = Modifier.weight(1f)) {
                            Row(
                                modifier = Modifier.fillMaxWidth(),
                                horizontalArrangement = Arrangement.SpaceBetween,
                                verticalAlignment = Alignment.CenterVertically
                            ) {
                                Text(
                                    text = msg.name,
                                    fontSize = 16.sp,
                                    fontWeight = FontWeight.Medium,
                                    color = Color.Black,
                                    maxLines = 1,
                                    overflow = TextOverflow.Ellipsis
                                )
                                Text(
                                    text = msg.time,
                                    fontSize = 12.sp,
                                    color = if (msg.unread > 0) WhatsAppGreen else Color.Gray,
                                    fontWeight = if (msg.unread > 0) FontWeight.Bold else FontWeight.Normal
                                )
                            }
                            Spacer(modifier = Modifier.height(2.dp))
                            Row(
                                modifier = Modifier.fillMaxWidth(),
                                horizontalArrangement = Arrangement.SpaceBetween,
                                verticalAlignment = Alignment.CenterVertically
                            ) {
                                Text(
                                    text = msg.lastMessage,
                                    fontSize = 14.sp,
                                    color = Color.Gray,
                                    maxLines = 1,
                                    overflow = TextOverflow.Ellipsis,
                                    modifier = Modifier.weight(1f).padding(end = 8.dp)
                                )
                                if (msg.unread > 0) {
                                    Box(
                                        modifier = Modifier
                                            .size(20.dp)
                                            .clip(CircleShape)
                                            .background(WhatsAppGreen),
                                        contentAlignment = Alignment.Center
                                    ) {
                                        Text(
                                            text = msg.unread.toString(),
                                            color = Color.White,
                                            fontSize = 10.sp,
                                            fontWeight = FontWeight.Bold
                                        )
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        FloatingActionButton(
            onClick = { },
            modifier = Modifier
                .align(Alignment.BottomEnd)
                .padding(16.dp),
            containerColor = WhatsAppGreen,
            contentColor = Color.White
        ) {
            Icon(Icons.Default.Message, contentDescription = "Yeni Mesaj")
        }
    }
}