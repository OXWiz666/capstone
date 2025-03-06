<!-- Sidebar -->
<aside class="fixed left-0 h-full w-[280px] bg-white border-r border-gray-200 pt-16">
    <nav class="h-full py-4 px-3">
        <ul class="space-y-1">
            <!-- Dashboard -->
            <li>
                <a href="{{ route('dashboard') }}" 
                   class="flex items-center px-4 py-2.5 text-sm font-medium rounded-lg {{ request()->routeIs('dashboard') ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900' }}">
                    <i data-lucide="layout-dashboard" class="w-5 h-5 mr-3"></i>
                    Dashboard
                </a>
            </li>

            <!-- Patients -->
            <li>
                <a href="{{ route('patients.index') }}"
                   class="flex items-center px-4 py-2.5 text-sm font-medium rounded-lg {{ request()->routeIs('patients.*') ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900' }}">
                    <i data-lucide="users" class="w-5 h-5 mr-3"></i>
                    Patients
                </a>
            </li>

            <!-- Appointments -->
            <li>
                <a href="{{ route('appointments.index') }}"
                   class="flex items-center px-4 py-2.5 text-sm font-medium rounded-lg {{ request()->routeIs('appointments.*') ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900' }}">
                    <i data-lucide="calendar" class="w-5 h-5 mr-3"></i>
                    Appointments
                </a>
            </li>

            <!-- Medicine Inventory -->
            <li>
                <a href="{{ route('inventory.index') }}"
                   class="flex items-center px-4 py-2.5 text-sm font-medium rounded-lg {{ request()->routeIs('inventory.*') ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900' }}">
                    <i data-lucide="pill" class="w-5 h-5 mr-3"></i>
                    Medicine Inventory
                </a>
            </li>

            <!-- Reports -->
            <li>
                <a href="{{ route('reports.index') }}"
                   class="flex items-center px-4 py-2.5 text-sm font-medium rounded-lg {{ request()->routeIs('reports.*') ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900' }}">
                    <i data-lucide="file-text" class="w-5 h-5 mr-3"></i>
                    Reports
                </a>
            </li>

            <!-- Settings -->
            <li>
                <a href="{{ route('settings.index') }}"
                   class="flex items-center px-4 py-2.5 text-sm font-medium rounded-lg {{ request()->routeIs('settings.*') ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900' }}">
                    <i data-lucide="settings" class="w-5 h-5 mr-3"></i>
                    Settings
                </a>
            </li>
        </ul>
    </nav>
</aside> 