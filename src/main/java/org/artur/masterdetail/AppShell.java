package org.artur.masterdetail;

import com.vaadin.flow.component.page.AppShellConfigurator;
import com.vaadin.flow.server.PWA;

/**
 * Use the @PWA annotation make the application installable on phones, tablets
 * and some desktop browsers.
 */
@PWA(name = "Master Detail TS", shortName = "master--detail--tS", enableInstallPrompt = false)
public class AppShell implements AppShellConfigurator {
}
