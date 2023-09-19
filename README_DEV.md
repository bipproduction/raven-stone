## PANDUAN RAVEN STONE DEVELOPER

*L/B menunjukkan contributor*\
*angka menunjukkan halaman pdf (design)*\
*= melambangkan pending*

_________________________________

### Berikut merupakan pembagian tugas, letak file yang harus di edit. Urutan pengerjaan dari yang mudah hingga rumit:
- (L) Navbar dashboard = src/pages/dashboard.tsx 

- (L) STEP :
   - 15 :: All = src/layouts/step_and_swot/step_analisys.tsx

- (L) SWOT :
   - 14 :: All = src/layouts/step_and_swot/swot_analisys.tsx

- (=) ML-AI :: file baru (component ada di SWOT > Suggestion Based AI) = src/layouts/step_and_swot/ml_ai.tsx

- (B) Summary (src/layouts/summary/main_summary.tsx) : 
   - 11 :: Select Candidate = src/layouts/summary/summary_select_candidate.tsx
   - 11 :: Chart tren sentiment = src/layouts/summary/summary_tren_sentiment.tsx
   - 11 :: Table = src/layouts/summary/top_10_province_by_conversation.tsx
   - (=)12 :: Top 5 = src/layouts/summary/top_5_winning_rate.tsx

- (B) Nation Wide Rating (National Popularity Metrics) :
   - 13 :: Bagian photo = src/layouts/prodictive_ai/nation_wide_rating/front/v3_front_nation_wide_rating.tsx
   - 13 :: Bagian select = src/layouts/prodictive_ai/nation_wide_rating/front/com/v3_com_nation_wide_rating_select_candidate.tsx
   - 13 :: Pie chart = src/layouts/prodictive_ai/nation_wide_rating/front/com/v3_com_chart_bar.tsx
   - 13 :: Line chart = src/layouts/prodictive_ai/nation_wide_rating/front/com/v3_com_nation_wide_rating_line_chart.tsx

- (L) Emotional View Via Province Couple (Regional Data Pairing) :
   - 10 :: All = src/layouts/prodictive_ai/emotion_couple/front/emotion_view_province_couple_v2.tsx

-  Emotional View Via Province (Regional Insights) :
   - (L) 8 :: Bagian Judul = src/layouts/prodictive_ai/emotion_view_province/main_emotion_view_province.tsx
   - (L) 8 :: Bagian content (province) = src/layouts/prodictive_ai/emotion_view_province/front/front_emotional_via_province.tsx
        - 8 :: Sentiment Analysis = src/layouts/prodictive_ai/emotion_view_province/front/com/com_chart_bar.tsx
        - 8 :: Context Direction (Public Concerns Trends) = src/layouts/prodictive_ai/emotion_view_province/front/com/com_context_direction.tsx
        - 8 :: Leader Persone Prediction (Leader Trait Assessment) = src/layouts/prodictive_ai/emotion_view_province/front/com/com_leader_persona.tsx

   - (B) 9 :: Bagian detail content (kabkot) = src/layouts/prodictive_ai/emotion_view_province/front/front_detail_kabupaten.tsx
        - 9 :: Sentiment Analysis = src/layouts/prodictive_ai/emotion_view_province/front/com/com_chart_detail_kabupaten.tsx
        - 9 :: Regions Hot Issues = src/layouts/prodictive_ai/emotion_view_province/front/com/com_kabupaten_word_cloud.tsx
        - 9 :: Context Direction (Public Concerns Trends) = src/layouts/prodictive_ai/emotion_view_province/front/com/com_chart_kabupaten_context_direction.tsx
        - 9 :: Leader Persone Prediction (Leader Trait Assessment) = src/layouts/prodictive_ai/emotion_view_province/front/com/com_chart_kabupaten_leader_persona.tsx

__________________________________
### BRANCHES
- Join :: merupakan branch yang digunakan sebagai endpoints dari masing-masing kontributor
_________________________________

\
\
\
***file ini akan terus diupdate apabila ada pembaruan*

