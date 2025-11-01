/**
 * Debugging utilities for troubleshooting API and authentication issues
 */

import appConfig from '../components/configs/app.config';
import { getDecryptedToken, isAuthenticated } from './functions/tokenEncryption';

/**
 * Logs comprehensive debugging information to console
 */
export const debugApiStatus = () => {
  console.group('🔍 API Debug Information');
  
  // Environment info
  console.log('Environment:', import.meta.env.MODE);
  console.log('API Base URL:', appConfig.apiPrefix);
  console.log('Current URL:', window.location.href);
  console.log('Origin:', window.location.origin);
  
  // Authentication status
  console.log('\n🔐 Authentication Status:');
  console.log('Is Authenticated:', isAuthenticated());
  const token = getDecryptedToken();
  console.log('Token exists:', !!token);
  if (token) {
    console.log('Token length:', token.length);
    console.log('Token preview:', token.substring(0, 20) + '...');
  }
  
  // LocalStorage info
  console.log('\n💾 LocalStorage:');
  console.log('admin_token exists:', !!localStorage.getItem('admin_token'));
  console.log('Total localStorage items:', localStorage.length);
  console.log('localStorage keys:', Object.keys(localStorage));
  
  // Browser capabilities
  console.log('\n🌐 Browser Info:');
  console.log('User Agent:', navigator.userAgent);
  console.log('Online:', navigator.onLine);
  console.log('Cookies enabled:', navigator.cookieEnabled);
  
  // Check CORS
  console.log('\n🚦 Testing CORS...');
  fetch(appConfig.apiPrefix + '/super-admin/company-cards', {
    method: 'OPTIONS',
  })
    .then(response => {
      console.log('OPTIONS request successful:', response.status);
      console.log('CORS headers:', response.headers);
    })
    .catch(error => {
      console.error('OPTIONS request failed:', error);
    });
  
  console.groupEnd();
  
  return {
    environment: import.meta.env.MODE,
    apiBaseUrl: appConfig.apiPrefix,
    currentUrl: window.location.href,
    isAuthenticated: isAuthenticated(),
    hasToken: !!token,
    localStorageKeys: Object.keys(localStorage),
    isOnline: navigator.onLine,
  };
};

/**
 * Tests a specific API endpoint
 */
export const testApiEndpoint = async (endpoint, method = 'GET', data = null) => {
  console.group(`🧪 Testing API: ${method} ${endpoint}`);
  
  const url = endpoint.startsWith('http') 
    ? endpoint 
    : appConfig.apiPrefix + endpoint;
  
  console.log('Full URL:', url);
  
  const token = getDecryptedToken();
  const headers = {
    'Content-Type': 'application/json',
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  console.log('Headers:', headers);
  console.log('Method:', method);
  if (data) console.log('Data:', data);
  
  try {
    const config = {
      method,
      headers,
    };
    
    if (data && (method === 'POST' || method === 'PUT')) {
      config.body = JSON.stringify(data);
    }
    
    console.log('Sending request...');
    const response = await fetch(url, config);
    
    console.log('Response Status:', response.status);
    console.log('Response Headers:', [...response.headers.entries()]);
    
    const responseData = await response.json().catch(() => null);
    console.log('Response Data:', responseData);
    
    console.groupEnd();
    
    return {
      success: response.ok,
      status: response.status,
      data: responseData,
    };
  } catch (error) {
    console.error('Request Failed:', error);
    console.error('Error Type:', error.name);
    console.error('Error Message:', error.message);
    
    if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
      console.error('⚠️ This is likely a CORS or network error!');
    }
    
    console.groupEnd();
    
    return {
      success: false,
      error: error.message,
      errorType: error.name,
    };
  }
};

/**
 * Checks if CORS is properly configured
 */
export const checkCORS = async () => {
  console.group('🚦 CORS Configuration Check');
  
  const baseUrl = appConfig.apiPrefix;
  console.log('Testing CORS for:', baseUrl);
  console.log('Current origin:', window.location.origin);
  
  try {
    // Try a simple OPTIONS request
    const response = await fetch(baseUrl, {
      method: 'OPTIONS',
      headers: {
        'Access-Control-Request-Method': 'GET',
        'Access-Control-Request-Headers': 'authorization,content-type',
      },
    });
    
    console.log('OPTIONS Response Status:', response.status);
    
    const corsHeaders = {
      'Access-Control-Allow-Origin': response.headers.get('Access-Control-Allow-Origin'),
      'Access-Control-Allow-Methods': response.headers.get('Access-Control-Allow-Methods'),
      'Access-Control-Allow-Headers': response.headers.get('Access-Control-Allow-Headers'),
      'Access-Control-Allow-Credentials': response.headers.get('Access-Control-Allow-Credentials'),
    };
    
    console.log('CORS Headers:', corsHeaders);
    
    if (!corsHeaders['Access-Control-Allow-Origin']) {
      console.warn('⚠️ No Access-Control-Allow-Origin header found!');
      console.warn('Backend needs to add CORS headers for:', window.location.origin);
    } else if (corsHeaders['Access-Control-Allow-Origin'] !== window.location.origin && 
               corsHeaders['Access-Control-Allow-Origin'] !== '*') {
      console.warn('⚠️ CORS origin mismatch!');
      console.warn('Expected:', window.location.origin);
      console.warn('Got:', corsHeaders['Access-Control-Allow-Origin']);
    } else {
      console.log('✅ CORS appears to be configured correctly');
    }
    
    console.groupEnd();
    return corsHeaders;
  } catch (error) {
    console.error('❌ CORS check failed:', error);
    console.error('This usually means:');
    console.error('1. Backend is not running');
    console.error('2. Backend is not accessible from this origin');
    console.error('3. Network connectivity issues');
    console.groupEnd();
    return null;
  }
};

/**
 * Comprehensive diagnostic check
 */
export const runDiagnostics = async () => {
  console.clear();
  console.log('🏥 Running Comprehensive Diagnostics...\n');
  
  // 1. Basic info
  const basicInfo = debugApiStatus();
  
  // 2. CORS check
  await checkCORS();
  
  // 3. Test a simple endpoint
  await testApiEndpoint('/super-admin/company-cards');
  
  console.log('\n✅ Diagnostics complete! Check the logs above for details.');
  
  return basicInfo;
};

// Expose to window for easy access from console
if (typeof window !== 'undefined') {
  window.debugApi = {
    status: debugApiStatus,
    test: testApiEndpoint,
    cors: checkCORS,
    diagnostics: runDiagnostics,
  };
  
  console.log('💡 Debug utilities available:');
  console.log('  window.debugApi.status()      - Check API status');
  console.log('  window.debugApi.cors()        - Check CORS configuration');
  console.log('  window.debugApi.test(endpoint) - Test specific endpoint');
  console.log('  window.debugApi.diagnostics() - Run full diagnostics');
}

