package com.example.nikolastevanovic.curriculumvitaecv;

import android.content.Intent;
import android.net.Uri;
import android.support.v7.app.ActionBar;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.EditText;
import android.widget.Toast;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        getSupportActionBar().setDisplayShowHomeEnabled(true);
        getSupportActionBar().setLogo(R.mipmap.ic_description_black_24dp);
        getSupportActionBar().setDisplayUseLogoEnabled(true);
    }
    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_main, menu);
        return true;
    }
    public static final String EXTRA_MESSAGE = "";
    public void sendMessage(View view) {

        int id = view.getId();
        if(id == R.id.button) {
            Intent intent = new Intent(this, DisplayMessageActivity.class);
            String msg1 = getResources().getString(R.string.tekst_obrazovanje);
            intent.putExtra(EXTRA_MESSAGE,msg1);
            startActivity(intent);
        }
        else if(id == R.id.button2)
        {
            Intent intent = new Intent(this, DisplayMessageActivity.class);
            String msg1 = getResources().getString(R.string.tekst_iskustvo);
            intent.putExtra(EXTRA_MESSAGE,msg1);
            startActivity(intent);

        }
        else if(id == R.id.button3)
        {
            Intent intent = new Intent(this, DisplayMessageActivity.class);
            String msg1 = getResources().getString(R.string.tekst_licni);
            intent.putExtra(EXTRA_MESSAGE,msg1);
            startActivity(intent);
        }
        else if(id == R.id.button4)
        {
            Intent intent = new Intent(this, DisplayMessageActivity.class);
            String msg1 = getResources().getString(R.string.tekst_ostalo);
            intent.putExtra(EXTRA_MESSAGE,msg1);
            startActivity(intent);
        }

    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle presses on the action bar items
        switch (item.getItemId()) {
            case R.id.PDF:
                String pdf_url ="https://www.docdroid.net/file/download/D3JVGvy/curriculum-vitae.pdf";
                Intent browserIntent = new Intent(Intent.ACTION_VIEW, Uri.parse(pdf_url));
                startActivity(browserIntent);
                return true;
            case R.id.OpenPDF:
                String pdf_url1 = "https://www.docdroid.net/D3JVGvy/curriculum-vitae.pdf.html";
                Intent browserIntent1 = new Intent(Intent.ACTION_VIEW, Uri.parse(pdf_url1));
                startActivity(browserIntent1);

                return true;
            default:
                return super.onOptionsItemSelected(item);
        }
    }
}
